import { NextResponse } from "next/server";
import { projects } from "@/data/projects";
import { rateLimit, getClientIp } from "@/lib/rateLimit";

const PROJECTS_LIMIT = 60;
const PROJECTS_WINDOW_MS = 60 * 1000;

export async function GET(request: Request) {
  const ip = getClientIp(request);
  const limitResult = rateLimit(`projects:${ip}`, PROJECTS_LIMIT, PROJECTS_WINDOW_MS);
  if (!limitResult.success) {
    return NextResponse.json(
      { error: "Too many requests. Please slow down." },
      { status: 429, headers: { "Retry-After": String(limitResult.retryAfterSeconds) } }
    );
  }

  const { searchParams } = new URL(request.url);
  const category = searchParams.get("category");
  const query = searchParams.get("q")?.toLowerCase();
  const limit = searchParams.get("limit");

  let filtered = [...projects];

  if (category && category !== "all") {
    filtered = filtered.filter((p) => p.category === category);
  }

  if (query) {
    filtered = filtered.filter(
      (p) =>
        p.title.toLowerCase().includes(query) ||
        p.shortDescription.toLowerCase().includes(query) ||
        p.location.toLowerCase().includes(query) ||
        p.type.toLowerCase().includes(query)
    );
  }

  if (limit) {
    const numLimit = parseInt(limit, 10);
    if (!isNaN(numLimit)) {
      filtered = filtered.slice(0, numLimit);
    }
  }

  return NextResponse.json({
    total: filtered.length,
    projects: filtered,
  });
}
