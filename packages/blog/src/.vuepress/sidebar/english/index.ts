import { arraySidebar } from "vuepress-theme-hope";

export const english = arraySidebar([
  "",
  "everyday/",
  "grammar",
  {
    text: "词汇",
    prefix: "vocabulary/",
    link: "vocabulary/",
    children: ["high-frequency-vocabulary", "root"],
  },
]);
