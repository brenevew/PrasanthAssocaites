import { MetadataRoute } from "next";
import { services } from "@/data/services";
import { getServicePath } from "@/data/serviceRoutes";
import { projects, hasDetailsPage } from "@/data/projects";
import { blogPosts } from "@/data/blog";
import { SITE_URL } from "@/lib/seo";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = SITE_URL;

  // Core static routes
  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: `${baseUrl}/`,
      changeFrequency: "weekly",
      priority: 1.0,
    },
    {
      url: `${baseUrl}/services`,
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/property-investment`,
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/projects`,
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/plan-home`,
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/about`,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/contact`,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/request-quote`,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/locations/coimbatore`,
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/locations/nilgiris-ooty`,
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/locations/gudalur`,
      changeFrequency: "weekly",
      priority: 0.8,
    },
  ];

  // Dynamic project routes
  // Only projects with a written case study; placeholder pages are noindex until filled in.
  const projectRoutes: MetadataRoute.Sitemap = projects.filter(hasDetailsPage).map((project) => ({
    url: `${baseUrl}/projects/${project.slug}`,
    images: [...new Set([project.image, ...project.galleryImages])].map((src) => `${baseUrl}${src}`),
    changeFrequency: "monthly",
    priority: 0.75,
  }));

  const serviceRoutes: MetadataRoute.Sitemap = services.map((service) => ({
    url: `${baseUrl}${getServicePath(service.slug)}`,
    changeFrequency: "monthly",
    priority: 0.9,
  }));

  // Articles carry their real publish date as lastModified.
  const blogRoutes: MetadataRoute.Sitemap = [
    { url: `${baseUrl}/blog`, changeFrequency: "weekly", priority: 0.7 },
    ...blogPosts.map((post) => ({
      url: `${baseUrl}/blog/${post.slug}`,
      lastModified: new Date(`${post.datePublished}T00:00:00Z`),
      changeFrequency: "monthly" as const,
      priority: 0.6,
    })),
  ];

  return [...staticRoutes, ...serviceRoutes, ...projectRoutes, ...blogRoutes];
}
