/* eslint-disable @typescript-eslint/no-require-imports -- Node test tooling uses CommonJS. */
const test = require("node:test");
const assert = require("node:assert/strict");
const load = require("./test-support/load-ts.cjs");

const { serviceFaqs } = load("src/data/serviceFaqs.ts");
const { services } = load("src/data/services.ts");
const { getServicePath } = load("src/data/serviceRoutes.ts");
const { SITE_URL } = load("src/lib/seo.ts");

const landing = services.filter((s) => getServicePath(s.slug) === `/services/${s.slug}`).map((s) => s.slug);

test("every service landing page has its own questions and answers", () => {
  assert.equal(landing.length, 21);
  for (const slug of landing) {
    const faqs = serviceFaqs[slug];
    assert.ok(faqs && faqs.length >= 3, `${slug} needs at least 3 FAQs`);
  }
  assert.deepEqual(Object.keys(serviceFaqs).sort(), [...landing].sort(), "no FAQs for unknown services");
  const questions = Object.values(serviceFaqs).flat().map((f) => f.q);
  assert.equal(new Set(questions).size, questions.length, "questions are unique across pages");
});

test("answers are quotable, factual in tone, and follow the copy rules", () => {
  const urls = new Set(load("src/app/sitemap.ts").default().map((entry) => entry.url));
  for (const [slug, faqs] of Object.entries(serviceFaqs)) {
    for (const { q, a } of faqs) {
      const text = `${q} ${a}`;
      assert.ok(q.endsWith("?"), `${slug}: question should end with "?"`);
      const words = a.replace(/\[([^\]]+)\]\([^)]+\)/g, "$1").split(/\s+/).length;
      assert.ok(words >= 15 && words <= 85, `${slug}: answer length ${words} words`);
      assert.doesNotMatch(text, /—| - /, `${slug}: no em dashes or spaced hyphens`);
      assert.doesNotMatch(text, /₹|\b100%|guarantee|IBBI|licensed|certified|registered valuer/i, `${slug}: no prices, guarantees or registrations`);
      for (const [, href] of a.matchAll(/\]\((\/[^)]*)\)/g)) {
        assert.match(href, /^\/(blog|services|projects|locations)\//, `${slug}: link ${href}`);
        assert.ok(urls.has(SITE_URL + href), `${slug}: missing FAQ destination ${href}`);
      }
    }
  }
});

test("location pages have quotable answers that follow the copy rules", () => {
  const { locationPages } = load("src/data/locationPages.ts");
  const urls = new Set(load("src/app/sitemap.ts").default().map((entry) => entry.url));
  const serviceQuestions = new Set(Object.values(serviceFaqs).flat().map((f) => f.q));
  assert.deepEqual(Object.keys(locationPages).sort(), ["coimbatore", "gudalur", "nilgiris-ooty"]);
  for (const [slug, page] of Object.entries(locationPages)) {
    assert.ok(urls.has(`${SITE_URL}/locations/${slug}`), `${slug} is in the sitemap`);
    assert.ok(page.faqs.length >= 4, `${slug} needs at least 4 FAQs`);
    for (const s of page.services) assert.ok(services.some((service) => service.slug === s), `${slug}: unknown service ${s}`);
    const copy = [
      page.intro, page.heroNote ?? "", page.servicesHeading ?? "", page.servicesIntro ?? "",
      ...(page.overview ?? []).flatMap((section) => [section.heading, ...section.paragraphs]),
      ...page.conditions.flatMap((c) => [c.title, c.body]),
      ...(page.places ?? []).map((p) => p.note),
      ...(page.caseStudies ? [page.caseStudies.heading, page.caseStudies.intro, ...page.caseStudies.items.flatMap((item) => [item.heading, ...item.paragraphs])] : []),
      ...(page.serviceSectors ?? []).flatMap((sector) => [sector.heading, sector.body, ...sector.links.map((link) => link.note ?? "")]),
      ...(page.process ? [page.process.heading, page.process.intro, ...page.process.steps.flatMap((step) => [step.title, step.body])] : []),
      ...(page.pricing ? [page.pricing.heading, ...page.pricing.paragraphs, ...page.pricing.items, ...page.pricing.afterItems] : []),
    ].join(" ");
    for (const item of page.caseStudies?.items ?? []) assert.ok(urls.has(`${SITE_URL}/projects/${item.slug}`), `${slug}: case study ${item.slug} has no project page`);
    for (const link of (page.serviceSectors ?? []).flatMap((sector) => sector.links)) assert.ok(urls.has(SITE_URL + getServicePath(link.slug)), `${slug}: sector link ${link.slug}`);
    assert.doesNotMatch(copy, /—| - |₹|\b100%|guarantee|licensed|certified|bespoke|luxury|premium/i, `${slug}: page copy rules`);
    for (const [, href] of copy.matchAll(/\]\((\/[^)]*)\)/g)) assert.ok(urls.has(SITE_URL + href), `${slug}: missing content destination ${href}`);
    for (const { q, a } of page.faqs) {
      assert.ok(q.endsWith("?"), `${slug}: question should end with "?"`);
      assert.ok(!serviceQuestions.has(q), `${slug}: question repeats a service page: ${q}`);
      const words = a.replace(/\[([^\]]+)\]\([^)]+\)/g, "$1").split(/\s+/).length;
      assert.ok(words >= 15 && words <= 85, `${slug}: answer length ${words} words`);
      assert.doesNotMatch(`${q} ${a}`, /—| - |₹|\b100%|guarantee|licensed|certified|registered valuer/i, `${slug}: FAQ copy rules`);
      for (const [, href] of a.matchAll(/\]\((\/[^)]*)\)/g)) assert.ok(urls.has(SITE_URL + href), `${slug}: missing FAQ destination ${href}`);
    }
  }
});
