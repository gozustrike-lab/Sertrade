// ============================================================
// FAST PAGE PRO STUDIO v2.0 — Admin Route Handler
// Renders the embedded Sanity Studio at /admin.
// ============================================================

import { NextStudio } from "next-sanity/studio";
import config from "../../../../sanity.config";

export default function AdminPage() {
  return <NextStudio config={config} />;
}
