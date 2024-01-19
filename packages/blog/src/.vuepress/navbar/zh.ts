import { navbar } from "vuepress-theme-hope";

export const zhNavbar = navbar([
  "/",
  {
    text: "AI",
    icon: "people",
    prefix: "/ai/",
    link: "/ai/",
  },
  {
    text: "英文",
    icon: "note",
    prefix: "/english/",
    children: [
      { text: "英文学习", link: "", icon: "study" },
      {
        text: "每日英文",
        link: "everyday/",
        icon: "article",
        activeMatch: "^/everyday/$",
      },
      {
        text: "news",
        link: "news/",
        activeMatch: "^/news/$",
      },
      {
        text: "词汇",
        prefix: "vocabulary/",
        children: ["high-frequency-vocabulary", "root"],
      },
      "grammar",
    ],
  },
  {
    text: "电脑硬件",
    icon: "computer",
    prefix: "/computer/",
    link: "/computer/",
  },
  {
    text: "技术",
    icon: "form",
    prefix: "/tech/",
    link: "/tech/",
  },
  {
    text: "代码笔记",
    icon: "code",
    children: [
      {
        text: "代码笔记",
        icon: "code",
        link: "/code/",
        activeMatch: "^/code/$",
      },
      {
        text: "后端运维",
        children: ["/linux/"],
      },
    ],
  },
  {
    text: "软件教程",
    icon: "software",
    prefix: "/software/",
    children: [
      {
        text: "软件教程",
        icon: "software",
        link: "",
        activeMatch: "^/software/$",
      },
      "vscode/",
      "git/",
      "comsol/",
    ],
  },
]);
