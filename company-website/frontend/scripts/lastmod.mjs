// Writes src/data/lastModified.json: for each group of sitemap pages, the date
// of the last commit that touched the files those pages are built from.
// sitemap.ts reads it for `lastModified`, so the date moves only when the
// content does (not on every build).
//
// Runs before `next build`. Without full git history (a shallow clone, or no
// git at all) the committed file is left as it is, rather than stamping every
// page with the clone's single commit date.
import { execFileSync } from "node:child_process";
import { writeFileSync } from "node:fs";

const OUT = "src/data/lastModified.json";

// Page group -> the source paths its content comes from (relative to frontend/).
const groups = {
  home: ["src/app/page.tsx", "src/data/quality.ts", "src/data/testimonials.ts", "src/data/homeFaqs.ts"],
  services: ["src/app/services/page.tsx", "src/app/services/ServicesPageClient.tsx", "src/data/services.ts", "src/data/serviceQuoteData.ts"],
  servicePages: [
    "src/app/services/[slug]",
    "src/components/services",
    "src/data/services.ts",
    "src/data/servicePageContent.ts",
    "src/data/serviceFaqs.ts",
    "src/lib/serviceSeo.ts",
  ],
  turnkey: ["src/app/services/turnkey-design-build-coimbatore", "src/components/services"],
  propertyInvestment: ["src/app/property-investment"],
  projects: ["src/app/projects/page.tsx", "src/app/projects/ProjectsClient.tsx", "src/data/projects.ts", "src/data/designGallery.ts"],
  projectPages: ["src/app/projects/[slug]", "src/data/projects.ts"],
  planHome: ["src/app/plan-home", "src/components/planner"],
  about: ["src/app/about"],
  contact: ["src/app/contact"],
  requestQuote: ["src/app/request-quote", "src/data/serviceQuoteData.ts"],
  coimbatore: ["src/app/locations/coimbatore", "src/data/locationPages.ts", "src/components/locations"],
  nilgiris: ["src/app/locations/nilgiris-ooty", "src/data/locationPages.ts", "src/components/locations"],
  gudalur: ["src/app/locations/gudalur", "src/data/locationPages.ts", "src/components/locations"],
  // Blog posts carry their own dates in data/blog.ts.
};

function git(args) {
  return execFileSync("git", args, { encoding: "utf8" }).trim();
}

try {
  if (git(["rev-parse", "--is-shallow-repository"]) === "true") {
    console.log(`lastmod: shallow clone, keeping ${OUT}`);
    process.exit(0);
  }
} catch {
  console.log(`lastmod: git unavailable, keeping ${OUT}`);
  process.exit(0);
}

const dates = {};
for (const [group, paths] of Object.entries(groups)) {
  // %cs = committer date, YYYY-MM-DD.
  const date = git(["log", "-1", "--format=%cs", "--", ...paths]);
  if (date) dates[group] = date;
}

writeFileSync(OUT, `${JSON.stringify(dates, null, 2)}\n`);
console.log(`lastmod: wrote ${OUT}`);
