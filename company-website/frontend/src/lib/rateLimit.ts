import { headers } from "next/headers";

/**
 * In-memory, fixed-window rate limiter.
 *
 * This is a single-process, best-effort defense against form/upload spam and
 * accidental retry storms — it is NOT a substitute for a shared store when
 * running more than one replica (see NEXT_SERVER_ACTIONS_ENCRYPTION_KEY in
 * .env.example: this app already documents that self-hosted deployments may
 * scale out). Each replica tracks its own counters, so a client's effective
 * limit is `limit * replicaCount`. That's an acceptable trade-off here: there
 * is no Redis/Upstash configured, and the goal is to blunt casual abuse of
 * the public form/upload/sync endpoints, not to enforce a hard global cap.
 */

interface Bucket {
  count: number;
  resetAt: number;
}

const buckets = new Map<string, Bucket>();

// Bound memory: opportunistically sweep expired buckets on a cadence rather
// than on every request.
const SWEEP_INTERVAL_MS = 5 * 60 * 1000;
let lastSweep = Date.now();

function sweepExpired(now: number) {
  if (now - lastSweep < SWEEP_INTERVAL_MS) return;
  lastSweep = now;
  for (const [key, bucket] of buckets) {
    if (bucket.resetAt <= now) buckets.delete(key);
  }
}

export interface RateLimitResult {
  success: boolean;
  /** Requests remaining in the current window (0 when blocked). */
  remaining: number;
  /** Seconds until the caller may retry. Only meaningful when success is false. */
  retryAfterSeconds: number;
}

/**
 * Checks and consumes one request against a fixed window keyed by `key`.
 * `key` should already include a namespace (e.g. "upload:203.0.113.4") so
 * different endpoints don't share a budget.
 */
export function rateLimit(key: string, limit: number, windowMs: number): RateLimitResult {
  const now = Date.now();
  sweepExpired(now);

  const existing = buckets.get(key);

  if (!existing || existing.resetAt <= now) {
    buckets.set(key, { count: 1, resetAt: now + windowMs });
    return { success: true, remaining: limit - 1, retryAfterSeconds: 0 };
  }

  if (existing.count >= limit) {
    return {
      success: false,
      remaining: 0,
      retryAfterSeconds: Math.max(1, Math.ceil((existing.resetAt - now) / 1000)),
    };
  }

  existing.count += 1;
  return { success: true, remaining: limit - existing.count, retryAfterSeconds: 0 };
}

/**
 * Best-effort client IP for rate-limit keying. Trusts the first hop's
 * X-Forwarded-For entry, which is fine for identifying repeat callers even
 * though it's spoofable — this limiter is an abuse deterrent, not an
 * authentication boundary.
 */
export function getClientIp(req: Request): string {
  const forwardedFor = req.headers.get("x-forwarded-for");
  if (forwardedFor) {
    const first = forwardedFor.split(",")[0]?.trim();
    if (first) return first;
  }
  const realIp = req.headers.get("x-real-ip");
  if (realIp) return realIp;
  return "unknown";
}

/** Same as getClientIp, for Server Actions where there is no Request object. */
export async function getClientIpFromHeaders(): Promise<string> {
  const h = await headers();
  const forwardedFor = h.get("x-forwarded-for");
  if (forwardedFor) {
    const first = forwardedFor.split(",")[0]?.trim();
    if (first) return first;
  }
  const realIp = h.get("x-real-ip");
  if (realIp) return realIp;
  return "unknown";
}
