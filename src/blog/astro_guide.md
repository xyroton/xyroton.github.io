---
title: Let's Learn Astro
draft: true
author: Xyroton
description: "The ABC of Astro"
image:
  url: "/blog/astro.png"
  alt: "The word Astro against an illustration of planets and stars."
pubDate: 2025-06-22
tags: ["frontend"]
---

Astro is a modern web framework designed for building fast, content-focused websites.

## Setup

### Install

```
npm create astro@latest
```

### Key Files

- `package.json`  
  Manages dependencies and scripts like `npm run dev` and `npm run build`.

- `astro.config.mjs`  
  Configuration file for integrations, build settings, and server behavior.  
  Supports `.mjs`, `.js`, `.cjs`, and `.ts`.  
  Use `defineConfig()` for IntelliSense support.

- `tsconfig.json`  
  TypeScript config that enables language features and improves import resolution.

## Develop

Start the dev server and watch for file changes:

```
npm run dev
```

## Build

Generate a production-ready version of your site:

```
npm run build
```

The output is saved to `dist/`. Astro checks for build and type errors if TypeScript is in strict mode.

To preview locally:

```
npm run preview
```

### TypeScript

Astro supports [import aliases](https://docs.astro.build/en/guides/imports/#aliases) to simplify import paths.

