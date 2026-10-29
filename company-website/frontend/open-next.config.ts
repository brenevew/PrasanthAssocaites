import { defineCloudflareConfig } from "@opennextjs/cloudflare";
import staticAssetsIncrementalCache from "@opennextjs/cloudflare/overrides/incremental-cache/static-assets-incremental-cache";

// Pages are pre-rendered at build time and shipped with the Worker's static
// assets, so the Worker serves them from that cache instead of rendering every
// request (which ran into Cloudflare error 1102, "Worker exceeded resource
// limits"). This cache is read-only: it suits this site because every page is
// static and none uses `revalidate`. If ISR or `revalidatePath` is ever
// introduced, switch to the R2 incremental cache (needs R2 enabled on the
// account and an R2 bucket binding in wrangler.jsonc).
export default defineCloudflareConfig({
  incrementalCache: staticAssetsIncrementalCache,
  // Answer cached pages before the Next.js server is loaded and routed, which
  // is most of the CPU a cache hit otherwise costs. Must be turned off if
  // Partial Prerendering is ever enabled.
  enableCacheInterception: true,
});
