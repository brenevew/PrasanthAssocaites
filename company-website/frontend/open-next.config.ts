import { defineCloudflareConfig } from "@opennextjs/cloudflare";
import r2IncrementalCache from "@opennextjs/cloudflare/overrides/incremental-cache/r2-incremental-cache";

// Pages are pre-rendered at build time and `opennextjs-cloudflare deploy` copies
// them into R2, so the Worker serves them from the cache instead of rendering
// every request (which ran into Cloudflare error 1102, "Worker exceeded resource
// limits"). No page uses `revalidate`, so no tag cache or queue is needed; add
// them if ISR or `revalidatePath` is ever introduced.
export default defineCloudflareConfig({
  incrementalCache: r2IncrementalCache,
  // Answer cached pages straight from R2 before the Next.js server is loaded
  // and routed, which is most of the CPU a cache hit otherwise costs. Must be
  // turned off if Partial Prerendering is ever enabled.
  enableCacheInterception: true,
});
