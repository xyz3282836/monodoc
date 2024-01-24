import { createRequire } from "node:module";

export const VERSION = (<Record<string, unknown> & { version: string }>(
    createRequire(import.meta.url)("vuepress-theme-hope/package.json")
  )).version;