import { sidebar } from "vuepress-theme-hope";
import { english } from "./english/index.js";
import { comsol, software, vscode } from "./software/index.js";

export const zhSidebar = sidebar({
  "/software/": software,
  "/software/comsol/": comsol,
  "/software/vscode/": vscode,
  "/software/git/": "structure",

  "/english/": english,
  "/english/everyday/": "structure",
  "/english/news/": "structure",

  // fallback
  "/": ["", "english/", "computer/", "tech/", "software/"],
});
