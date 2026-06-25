import { draftMode } from "next/headers";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  let redirectUrl = searchParams.get("redirect") || "/admin";

  // Security: only allow draft mode to redirect to /admin/* paths
  // This prevents the VE overlay from ever appearing on public pages
  if (!redirectUrl.startsWith("/admin")) {
    redirectUrl = "/admin";
  }

  const draft = await draftMode();
  draft.enable();
  return NextResponse.redirect(new URL(redirectUrl, request.url));
}