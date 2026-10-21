/* eslint-disable @typescript-eslint/no-require-imports -- Optional browser regression tooling. */
const fs = require('node:fs/promises');
const { chromium } = require(process.env.PLAYWRIGHT_MODULE || 'playwright');
const path = require('node:path');
const mode = process.argv[2] || 'before';
const base = process.argv[3] || 'http://127.0.0.1:3100';
const root = process.env.SEO_SCREENSHOTS || '/tmp/prasanth-seo-visual';
const out = path.join(root, mode);
const routes = ['/', '/services', '/services#construction', '/services#design', '/services#valuation', '/services#realestate', '/services/turnkey-design-build-coimbatore', '/locations/coimbatore', '/locations/nilgiris-ooty', '/locations/gudalur', '/contact', '/request-quote?service=residential-construction', '/property-investment', '/projects'];
(async () => {
 await fs.mkdir(out, {recursive:true});
 const browser = await chromium.launch({headless:true});
 const results=[];
 for (const [device,viewport] of Object.entries({desktop:{width:1440,height:1000},mobile:{width:390,height:844}})) {
  const context = await browser.newContext({viewport, reducedMotion:'reduce'});
  await context.route('**/*', route => new URL(route.request().url()).origin === base ? route.continue() : route.abort());
  const page=await context.newPage();
  for (const route of routes) {
   const errors=[];
   const onerror=e=>errors.push(e.message); page.on('pageerror',onerror);
   await page.goto('about:blank');
   const response=await page.goto(base+route,{waitUntil:'networkidle'});
   await page.evaluate(()=>document.fonts.ready);
   await page.waitForTimeout(350);
   // Reveal lazy content and load offscreen photographs without changing app styles.
   await page.evaluate(async()=>{for(let y=0;y<document.body.scrollHeight;y+=650){window.scrollTo({top:y,behavior:'instant'});await new Promise(r=>setTimeout(r,30));}window.scrollTo({top:0,behavior:'instant'});});
   for (const img of await page.locator('img[loading="lazy"]').all()) {
    await img.evaluate(async (el) => { el.scrollIntoView({behavior:'instant',block:'center'}); try { await el.decode(); } catch {} });
   }
   await page.evaluate(()=>window.scrollTo({top:0,behavior:'instant'}));
   await page.waitForTimeout(650);
   const name=device+'-'+route.replace(/[^a-z0-9]/gi,'_');
   const content=await page.evaluate(()=>({title:document.title,description:document.querySelector('meta[name="description"]')?.content,canonical:document.querySelector('link[rel="canonical"]')?.href,h1:[...document.querySelectorAll('h1')].map(x=>x.textContent),text:document.body.innerText,links:[...document.querySelectorAll('a[href]')].map(a=>a.getAttribute('href')),schema:[...document.querySelectorAll('script[type="application/ld+json"]')].map(s=>JSON.parse(s.textContent)),images:[...document.images].map(i=>({src:i.getAttribute('src'),alt:i.getAttribute('alt'),loading:i.loading,complete:i.complete,width:i.naturalWidth})),overflow:document.documentElement.scrollWidth>innerWidth}));
   await page.screenshot({path:path.join(out,name+'.png'),fullPage:true,animations:'disabled'});
   results.push({device,route,status:response.status(),name,errors,...content});
   page.off('pageerror',onerror);
   console.log(mode,device,route,response.status(),errors.length);
   await fs.writeFile(path.join(out,'pages.json'),JSON.stringify(results,null,2));
  }
  await context.close();
 }
 await browser.close();
})().catch(e=>{console.error(e);process.exit(1)});
