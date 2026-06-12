import { NextResponse } from "next/server";
import { revalidateTag } from "next/cache";

/**
 * On-demand revalidation endpoint.
 *
 * Wire this up in WordPress so the Next.js site refreshes the moment you publish
 * or edit content, instead of waiting for the 60s ISR window.
 *
 * Call it with the shared secret, e.g.:
 *   https://abdul.qarigroup.com/api/revalidate?secret=YOUR_SECRET
 *
 * In WordPress, the simplest options are the "WP Webhooks" plugin (fire on
 * post save/update) or a small snippet hooked to `save_post` that requests
 * this URL. Keep REVALIDATE_SECRET private.
 */
function handle(request) {
  const secret = new URL(request.url).searchParams.get("secret");

  if (!process.env.REVALIDATE_SECRET || secret !== process.env.REVALIDATE_SECRET) {
    return NextResponse.json({ revalidated: false, message: "Invalid secret" }, { status: 401 });
  }

  // All WP-backed fetches are tagged "wp" — this clears them all at once.
  revalidateTag("wp");

  return NextResponse.json({ revalidated: true, now: Date.now() });
}

export async function GET(request) {
  return handle(request);
}

export async function POST(request) {
  return handle(request);
}
