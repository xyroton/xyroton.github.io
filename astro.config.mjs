import { defineConfig } from "astro/config";
import remarkMath from "remark-math";
import rehypeKatex from "rehype-katex";
import expressiveCode from "astro-expressive-code";
import remarkHeadingNumbering from "./src/plugins/remark-heading-numbering.mjs";

// https://astro.build/config
export default defineConfig({
  site: "https://xyroton.com",
  // base: "/astro-blog",
  integrations: [
    expressiveCode({
      // You can optionally override the plugin's default settings here
      frames: {
        // Example: Hide the "Copy to clipboard" button
        showCopyToClipboardButton: true,
      },
    }),
  ],
  markdown: {
    remarkPlugins: [remarkMath, remarkHeadingNumbering],
    rehypePlugins: [rehypeKatex],
  },
});
