import { company } from "@/data/company";

/**
 * Short links for review requests: /review/coimbatore and /review/gudalur.
 * Share them on WhatsApp or print them as QR codes; the destination can be
 * changed in data/company.ts without reprinting anything (hence a temporary
 * redirect, which also keeps these URLs out of search results).
 */
export async function GET(_request: Request, { params }: { params: Promise<{ office: string }> }) {
  const { office } = await params;
  const match = company.offices.find((o) => o.label.toLowerCase() === office.toLowerCase());
  if (!match) return new Response("Not found", { status: 404 });
  return Response.redirect(match.reviewLink, 302);
}
