// ============================================================
// FAST PAGE PRO STUDIO v2.0 — Draft Mode Enable API Route
// Enables Next.js Draft Mode when Presentation Tool requests it.
// ============================================================

import { draftMode } from "next/headers";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const redirectUrl = searchParams.get("redirect") || "/";

  const draft = await draftMode();
  draft.enable();

  return NextResponse.redirect(new URL(redirectUrl, request.url));
}
