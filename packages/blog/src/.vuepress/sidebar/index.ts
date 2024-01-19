import { sidebar } from "vuepress-theme-hope";
import { english } from "./english/index.js";
import { code } from "./code.js";
import {
  dart,
  javascript,
  language,
  markdown,
  python,
  typescript,
  vue,
} from "./language/index.js";
import { jquery, website } from "./website/index.js";
import { miniapp } from "./mini-app/index.js";
import { computer } from "./computer/index.js";
import { linux } from "./linux.js";
import { comsol, software, vscode } from "./software/index.js";

export const zhSidebar = sidebar({
  "/software/": software,
  "/software/comsol/": comsol,
  "/software/vscode/": vscode,
  "/software/git/": "structure",

  "/english/": english,
  "/english/everyday/": "structure",
  "/english/news/": "structure",

  "/ai/": "structure",
  "/tech/": "structure",
  "/computer/": computer,

  "/linux/": linux,

  "/code/windows/": "structure",

  "/code/website/jquery/": jquery,

  "/code/website/html/": "structure",

  "/code/website/css/": "structure",

  "/code/website/": website,

  "/code/vue/": vue,

  "/code/node-js/": "structure",

  "/code/mini-app/": miniapp,

  "/code/language/typescript/": typescript,

  "/code/language/python/": python,

  "/code/language/markdown/": markdown,

  "/code/language/js/": javascript,

  "/code/language/dart/": dart,

  "/code/language/": language,

  "/code/github/": "structure",

  "/code/basic/": "structure",

  "/code/android/": "structure",

  "/code/": code,

  // fallback
  "/": ["", "ai", "english/", "computer/", "tech/", "software/"],
});
