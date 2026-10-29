import { MetadataRoute } from "next";
import { services } from "@/data/services";
import { getServicePath } from "@/data/serviceRoutes";
import { projects, hasDetailsPage } from "@/data/projects";
import { blogPosts } from "@/data/blog";
import lastModified from "@/data/lastModified.json";
import { SITE_URL } from "@/lib/seo";

type PageGroup = keyof typeof lastModified;

// The date of the last commit to a page's source files (scripts/lastmod.mjs),
// so lastmod changes only when the content does. Omitted rather than guessed.
function modified(group: PageGroup): Pick<MetadataRoute.Sitemap[number], "lastModified"> {
  const date = lastModified[group];
  return date ? { lastModified: new Date(`${date}T00:00:00Z`) } : {};
}

// changefreq and priority are left out: Google ignores both.
export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = SITE_URL;

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: `${baseUrl}/`, ...modified("home") },
    { url: `${baseUrl}/services`, ...modified("services") },
    { url: `${baseUrl}/property-investment`, ...modified("propertyInvestment") },
    { url: `${baseUrl}/projects`, ...modified("projects") },
    { url: `${baseUrl}/plan-home`, ...modified("planHome") },
    { url: `${baseUrl}/about`, ...modified("about") },
    { url: `${baseUrl}/contact`, ...modified("contact") },
    { url: `${baseUrl}/request-quote`, ...modified("requestQuote") },
    { url: `${baseUrl}/locations/coimbatore`, ...modified("coimbatore") },
    { url: `${baseUrl}/locations/nilgiris-ooty`, ...modified("nilgiris") },
    { url: `${baseUrl}/locations/gudalur`, ...modified("gudalur") },
  ];

  // Only projects with a written case study; placeholder pages are noindex until filled in.
  const projectRoutes: MetadataRoute.Sitemap = projects.filter(hasDetailsPage).map((project) => ({
    url: `${baseUrl}/projects/${project.slug}`,
    images: [...new Set([project.image, ...project.galleryImages])].map((src) => `${baseUrl}${src}`),
    ...modified("projectPages"),
  }));

  const serviceRoutes: MetadataRoute.Sitemap = services.map((service) => {
    const path = getServicePath(service.slug);
    return {
      url: `${baseUrl}${path}`,
      ...modified(path === "/services/turnkey-design-build-coimbatore" ? "turnkey" : "servicePages"),
    };
  });

  // Articles carry their own dates: the revision date when set, else the publish date.
  const postDate = (post: (typeof blogPosts)[number]) => post.dateModified ?? post.datePublished;
  const newestPost = blogPosts.map(postDate).sort().at(-1);
  const blogRoutes: MetadataRoute.Sitemap = [
    { url: `${baseUrl}/blog`, ...(newestPost ? { lastModified: new Date(`${newestPost}T00:00:00Z`) } : {}) },
    ...blogPosts.map((post) => ({
      url: `${baseUrl}/blog/${post.slug}`,
      lastModified: new Date(`${postDate(post)}T00:00:00Z`),
    })),
  ];

  return [...staticRoutes, ...serviceRoutes, ...projectRoutes, ...blogRoutes];
}
