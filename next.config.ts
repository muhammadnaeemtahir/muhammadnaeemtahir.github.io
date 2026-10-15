// next.config.ts
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Required for GitHub Pages: generate static files in `out/`
  output: "export",

  // DO NOT set basePath or assetPrefix — this is a root user site
  // basePath: "",
  // assetPrefix: "",

  // Required: GitHub Pages can't run Next.js image optimization
  images: {
    unoptimized: true,
  },

  // Recommended: emits `out/index.html` and `/about/index.html`
  trailingSlash: true,
};

export default nextConfig;