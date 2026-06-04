// ============================================================
// FAST PAGE PRO STUDIO v2.0 — Visual Editing Overlay
// Renders the @sanity/visual-editing overlay when Draft Mode is active.
//
// REGLA FAST PAGE PRO:
// Footer credits are NOT wrapped with any stega annotations
// and will never show as editable in this overlay.
// ============================================================

"use client";

import { VisualEditing as SanityVisualEditing } from "next-sanity/visual-editing";

export function VisualEditing() {
  return <SanityVisualEditing />;
}
