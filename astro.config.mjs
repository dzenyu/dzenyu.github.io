import { defineConfig } from "astro/config";
import mdx from "@astrojs/mdx";
import sitemap from "@astrojs/sitemap";
import fs from "node:fs";
import path from "node:path";
import { legacyRedirects } from "./src/data/legacy-redirects.ts";

/**
 * Writes one static HTML redirect stub per legacy Jekyll URL directly into
 * the build output. This is done as an astro:build:done hook (rather than a
 * dynamic route) so the exact, case-sensitive original paths are preserved
 * on disk -- Astro's own routing lowercases/slugifies params in ways that
 * would otherwise clobber the mixed-case legacy URLs.
 */
function legacyRedirectsIntegration() {
  return {
    name: "legacy-redirects",
    hooks: {
      "astro:build:done": async ({ dir }) => {
        const outDir = new URL(dir).pathname;
        for (const { oldPath, newPath } of legacyRedirects) {
          const relative = oldPath.replace(/^\//, "");
          // A path ending in "/" is a directory-style URL (e.g. one of our
          // own earlier canonical URLs before a routing change); serve it
          // as index.html inside that directory. A path ending in a file
          // extension (e.g. legacy Jekyll's ".html" URLs) is written as-is.
          const filePath = relative.endsWith("/")
            ? path.join(outDir, relative, "index.html")
            : path.join(outDir, relative);
          fs.mkdirSync(path.dirname(filePath), { recursive: true });
          const html = `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<title>Redirecting…</title>
<meta http-equiv="refresh" content="0; url=${newPath}">
<link rel="canonical" href="${newPath}">
<meta name="robots" content="noindex">
</head>
<body>
<p>This page has moved. If you are not redirected automatically, follow <a href="${newPath}">this link</a>.</p>
</body>
</html>
`;
          fs.writeFileSync(filePath, html);
        }
      },
    },
  };
}

// https://astro.build/config
export default defineConfig({
  site: "https://code.dzenyu.com",
  integrations: [mdx(), sitemap(), legacyRedirectsIntegration()],
  vite: {
    server: {
      // Allow reaching the dev server over the LAN by mDNS hostname
      // (e.g. http://dzenyu-macpro.local:4321) -- Vite otherwise rejects
      // any Host header that is not localhost.
      allowedHosts: [".local"],
    },
  },
  redirects: {
    "/posts": "/blog/",
  },
});
