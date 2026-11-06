// @ts-check
import { defineConfig } from "astro/config";
import mdx from "@astrojs/mdx";
import sitemap from "@astrojs/sitemap";
import tailwindcss from "@tailwindcss/vite";
import { siteConfig } from "./src/config/site.ts";

import cloudflare from "@astrojs/cloudflare";
import react from "@astrojs/react";
import emdash from "emdash/astro";
import { d1, r2, sandbox } from "@emdash-cms/cloudflare";

export default defineConfig({
  site: siteConfig.siteUrl,
  trailingSlash: "ignore",
  markdown: {
    shikiConfig: {
      themes: { light: "github-light", dark: "github-dark-default" },
    },
  },
  vite: {
    plugins: [tailwindcss()],
    define: {
      "import.meta.env.EMDASH_PREVIEW_PATH_PATTERN": JSON.stringify("/blog/{id}"),
    },
  },
  output: "server",
  adapter: cloudflare(),
  integrations: [
    mdx(),
    sitemap({
      filter: (page) => !page.endsWith(".json") && !page.endsWith(".xml") && !page.endsWith(".txt"),
    }),
    react(),
    emdash({
      database: d1({ binding: "DB" }),
      storage: r2({ binding: "MEDIA" }),
      sandboxRunner: sandbox(),
    }),
  ],
});
