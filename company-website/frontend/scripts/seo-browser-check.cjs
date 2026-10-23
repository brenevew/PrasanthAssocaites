/* eslint-disable @typescript-eslint/no-require-imports -- Optional browser regression tooling. */
const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const { chromium } = require(process.env.PLAYWRIGHT_MODULE || "playwright");
const load = require("./test-support/load-ts.cjs");
const { services } = load("src/data/services.ts");
const { serviceQuoteSpecs } = load("src/data/serviceQuoteData.ts");
const { getServicePath } = load("src/data/serviceRoutes.ts");
const base = process.argv[2] || "http://127.0.0.1:3100";
// Submission testing must be explicitly enabled against a locally mocked webhook.
const submit = process.env.SEO_MOCK_SUBMISSIONS === "1";
if (submit) assert.ok(/^http:\/\/(127\.0\.0\.1|localhost):\d+$/.test(base));

(async () => {
  const browser = await chromium.launch();
  const results = [];
  try {
    const context = await browser.newContext({ viewport: { width: 1440, height: 1000 }, reducedMotion: "reduce" });
    await context.addInitScript(() => {
      window.seoEvents = [];
      window.seoOpened = [];
      window.addEventListener("prasanth:analytics", (event) => window.seoEvents.push(event.detail));
      window.open = (url) => { window.seoOpened.push(url); return null; };
    });
    const page = await context.newPage();
    const errors = [];
    page.on("pageerror", (error) => errors.push(error.message));
    const alias = await context.request.get(base + "/services/turnkey-construction?utm_source=seo-check", { maxRedirects: 0 });
    assert.equal(alias.status(), 308);
    assert.ok(alias.headers().location.includes("/services/turnkey-design-build-coimbatore?utm_source=seo-check"));
    const invalidQuote = await context.request.get(base + "/request-quote?service=seo-missing-service");
    assert.equal(invalidQuote.status(), 404);
    assert.match(await invalidQuote.text(), /name="robots" content="noindex"/);
    results.push("Turnkey alias permanently redirects; unknown quote services return 404 and noindex");

    const noScript = await browser.newContext({ javaScriptEnabled: false, viewport: { width: 1440, height: 1000 } });
    try {
      const staticPage = await noScript.newPage();
      for (const route of ["/", "/services", "/services/architectural-designs", "/projects/pricol", "/contact"]) {
        await staticPage.goto(base + route, { waitUntil: "networkidle" });
        assert.equal(await staticPage.locator("h1").count(), 1, route);
        assert.equal(await staticPage.locator("h1").evaluate((element) => element.checkVisibility({ checkOpacity: true, checkVisibilityCSS: true })), true, route);
        assert.equal(await staticPage.locator(".reveal").evaluateAll((elements) => elements.filter((element) => !element.checkVisibility({ checkOpacity: true, checkVisibilityCSS: true })).length), 0, route);
      }
    } finally { await noScript.close(); }
    results.push("Headings and page content remain visible without JavaScript on home, services, project and contact pages");

    await page.goto(base + "/services", { waitUntil: "networkidle" });
    for (const [label, count] of [["Construction", 8], ["Design & Arch", 6], ["Valuation & BOQ", 4], ["Property", 4], ["All Services", 22]]) {
      await page.getByRole("button", { name: label, exact: true }).click();
      assert.equal(await page.locator('[aria-label^="Configure "]').count(), count);
    }
    results.push("All four sector filters preserve 8/6/4/4 services");
    await page.locator("#residential-construction h2 a").click();
    assert.equal(new URL(page.url()).pathname, "/services");
    await page.getByRole("button", { name: "Close dialog" }).waitFor();
    await page.locator('input[name^="modal-field1"]').first().check({ force: true });
    await page.locator('input[name^="modal-field2"]').first().check({ force: true });
    const modalQuote = page.locator('a[href^="/request-quote?service=residential-construction&"]');
    const href = await modalQuote.getAttribute("href");
    assert.ok(href.includes("f1=") && href.includes("f2="));
    await modalQuote.click();
    await page.waitForURL("**/request-quote?*");
    await page.locator('input[name^="field1"]:checked').first().waitFor({ state: "attached" });
    await page.locator('input[name^="field2"]:checked').first().waitFor({ state: "attached" });
    results.push("Existing title click opens modal; option choices reach the quote form");
    if (submit) {
      await page.locator('input[name="name"]').fill("SEO Local Test");
      await page.locator('input[name="phone"]').fill("9000000000");
      await page.locator('input[name="email"]').fill("seo-test@example.invalid");
      await page.locator('input[name="location"]').fill("123 Test Street, Coimbatore");
      await page.getByRole("button", { name: "Request my free quote" }).click();
      await page.waitForFunction(() => window.seoEvents.some((event) => event.name === "quote_submit"));
      const events = await page.evaluate(() => window.seoEvents.filter((event) => event.name === "quote_submit"));
      assert.equal(events.length, 1);
      assert.equal(events[0].properties.service, "residential-construction");
      assert.equal(events[0].properties.location, "coimbatore");
      assert.doesNotMatch(JSON.stringify(events), /Test Street|9000000000|example.invalid/);
      results.push("Quote submits successfully to local mock; one privacy-safe conversion event");
    }
    for (const service of services) {
      await page.goto(base + `/request-quote?service=${service.slug}`, { waitUntil: "networkidle" });
      assert.ok((await page.locator("h1").innerText()).includes(service.title));
      assert.ok(await page.locator('input[name="name"]').count());
      assert.ok(serviceQuoteSpecs[service.slug]);
    }
    results.push("All 22 service-specific enquiry forms render without browser errors");
    await page.goto(base + getServicePath("architectural-designs"), { waitUntil: "networkidle" });
    const views = await page.evaluate(() => window.seoEvents.filter((event) => event.name === "service_view"));
    assert.equal(views.length, 1);
    assert.equal(views[0].properties.service, "architectural-designs");
    if (submit) {
      await page.locator('input[name="name"]').fill("SEO Local Test");
      await page.locator('input[name="phone"]').fill("9000000000");
      await page.locator('input[name="location"]').fill("123 Test Street, Ooty");
      await page.getByRole("button", { name: "Request Architectural Designs Quote" }).click();
      await page.getByText("We've received your request!", { exact: true }).waitFor();
      const events = await page.evaluate(() => window.seoEvents.filter((event) => event.name === "quote_submit"));
      assert.equal(events.length, 1);
      assert.equal(events[0].properties.service, "architectural-designs");
      results.push("New landing-page form submits with correct service attribution");
    }
    await page.getByRole("button", { name: "Chat on WhatsApp" }).click();
    await page.getByRole("button", { name: "Send Message via WhatsApp" }).click();
    const opened = await page.evaluate(() => window.seoOpened);
    assert.ok(opened[0].startsWith("https://wa.me/919360337733?text="));
    assert.equal(await page.evaluate(() => window.seoEvents.filter((event) => event.name === "whatsapp_click").length), 1);
    await page.evaluate(() => {
      const link = document.querySelector('a[href^="tel:"]');
      link.addEventListener("click", (event) => event.preventDefault(), { once: true });
      link.click();
    });
    assert.equal(await page.evaluate(() => window.seoEvents.filter((event) => event.name === "phone_click").length), 1);
    results.push("WhatsApp keeps +91 9360337733; WhatsApp and phone events fire once");
    if (submit) {
      await page.goto(base + "/contact", { waitUntil: "networkidle" });
      await page.locator('input[name="name"]').fill("SEO Local Test");
      await page.locator('input[name="phone"]').fill("9000000000");
      await page.locator('input[name="location"]').fill("123 Test Street, Gudalur");
      await page.locator('select[name="projectType"]').selectOption("residential");
      await page.getByRole("button", { name: "Send My Message" }).click();
      await page.getByText("We've received your request!", { exact: true }).waitFor();
      assert.equal(await page.evaluate(() => window.seoEvents.filter((event) => event.name === "form_submit").length), 1);
      results.push("Existing contact form submits successfully to the local mock");
    }
    const screenshotDir = process.env.SEO_SCREENSHOTS || "/tmp/prasanth-seo-new-pages";
    fs.mkdirSync(screenshotDir, { recursive: true });
    for (const [label, viewport] of Object.entries({ desktop: { width: 1440, height: 1000 }, mobile: { width: 390, height: 844 } })) {
      await page.setViewportSize(viewport);
      for (const slug of ["residential-construction", "architectural-designs", "bank-valuation-report", "property-acquisition-advisory"]) {
        await page.goto(base + getServicePath(slug), { waitUntil: "networkidle" });
        await page.evaluate(() => document.fonts.ready);
        assert.equal(await page.evaluate(() => document.documentElement.scrollWidth > innerWidth), false);
        await page.screenshot({ path: path.join(screenshotDir, `${label}-${slug}.png`), fullPage: true, animations: "disabled" });
      }
    }
    results.push("New pages from all four sectors fit desktop and mobile viewports");
    assert.deepEqual(errors, []);
    fs.writeFileSync("seo-reports/browser-validation.json", JSON.stringify({ base, mockSubmissions: submit, results, browserErrors: errors }, null, 2));
    results.forEach((result) => console.log("PASS:", result));
  } finally { await browser.close(); }
})().catch((error) => { console.error(error); process.exitCode = 1; });
