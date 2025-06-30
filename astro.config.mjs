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
      themes: ["solarized-light", "kanagawa-wave"],
      plugins: [pluginLineNumbers()],
      defaultProps: {
        showLineNumbers: false,
      },
      frames: {
        showCopyToClipboardButton: true,
      },
    }),
  ],
  markdown: {
    remarkPlugins: [remarkMath, remarkHeadingNumbering],
    rehypePlugins: [rehypeKatex],
  },
});
