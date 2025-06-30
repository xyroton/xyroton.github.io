import { defineConfig } from "astro/config";
import remarkMath from "remark-math";
import rehypeKatex from "rehype-katex";
import expressiveCode from "astro-expressive-code";
import remarkHeadingNumbering from "./src/plugins/remark-heading-numbering.mjs";
import { pluginLineNumbers } from "@expressive-code/plugin-line-numbers";

// https://astro.build/config
export default defineConfig({
  site: "https://xyroton.com",
  // base: "/astro-blog",
  integrations: [
    expressiveCode({
      // for light theme
      // themes: ["gruvbox-light-hard"],
      // for dark theme
      themes: ["kanagawa-wave"],
      // You can optionally override the plugin's default settings here
      plugins: [pluginLineNumbers()],
      defaultProps: {
        showLineNumbers: false,
      },
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
