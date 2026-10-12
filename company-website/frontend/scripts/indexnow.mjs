#!/usr/bin/env node
/**
 * IndexNow: tells Bing (and through it ChatGPT search, DuckDuckGo, Yandex) that
 * the site's pages are new or changed, so they are crawled in hours instead
 * of weeks. Google does not take part; use Search Console for Google.
 *
 *   npm run indexnow                    # submit every URL in the live sitemap
 *   npm run indexnow -- /services/x ... # submit only these paths
 *
 * Run it after a deploy. The key file public/239133877ccf03e0bf6153c597b0d9c7.txt must be live first.
 */
const HOST = "prasanthassociates.com";
const KEY = "239133877ccf03e0bf6153c597b0d9c7";
const ORIGIN = `https://${HOST}`;

const paths = process.argv.slice(2);
let urlList;
if (paths.length) {
  urlList = paths.map((p) => (p.startsWith("http") ? p : ORIGIN + (p.startsWith("/") ? p : "/" + p)));
} else {
  const res = await fetch(`${ORIGIN}/sitemap.xml`);
  if (!res.ok) throw new Error(`sitemap.xml returned HTTP ${res.status}`);
  urlList = [...(await res.text()).matchAll(/<loc>(.*?)<\/loc>/g)].map((m) => m[1]);
}

const keyCheck = await fetch(`${ORIGIN}/${KEY}.txt`);
if (!keyCheck.ok || (await keyCheck.text()).trim() !== KEY) {
  console.error(`Key file ${ORIGIN}/${KEY}.txt is not live yet. Deploy first, then run this again.`);
  process.exit(1);
}

const res = await fetch("https://api.indexnow.org/indexnow", {
  method: "POST",
  headers: { "Content-Type": "application/json; charset=utf-8" },
  body: JSON.stringify({ host: HOST, key: KEY, keyLocation: `${ORIGIN}/${KEY}.txt`, urlList }),
});
// 200 = accepted, 202 = accepted (key validation pending). Anything else is a problem.
console.log(`IndexNow: HTTP ${res.status} for ${urlList.length} URL(s)`);
if (res.status !== 200 && res.status !== 202) {
  console.error(await res.text());
  process.exit(1);
}
