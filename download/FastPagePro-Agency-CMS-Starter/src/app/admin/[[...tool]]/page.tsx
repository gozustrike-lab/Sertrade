// ============================================================
// FAST PAGE PRO STUDIO v2.0 — Admin Route Handler
// Renders the embedded Sanity Studio at /admin.
// Uses dynamic import because NextStudio uses React Context.
// ============================================================

"use client";

import dynamic from "next/dynamic";

const Studio = dynamic(
  () => import("next-sanity/studio").then((mod) => mod.NextStudio),
  {
    ssr: false,
    loading: () => (
      <div style={{ display: "flex", justifyContent: "center", alignItems: "center", minHeight: "100vh", background: "#001C3D" }}>
        <p style={{ color: "#D4AF37", fontSize: 18, fontFamily: "sans-serif" }}>Cargando Studio...</p>
      </div>
    ),
  }
);

export default function AdminPage() {
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  const config = require("../../../../sanity.config");
  return <Studio config={config.default || config} />;
}
