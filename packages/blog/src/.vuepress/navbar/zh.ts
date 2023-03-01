import { navbar } from "vuepress-theme-hope";

export const zhNavbar = navbar([
  "/",
  {
    text: "英文",
    icon: "note",
    prefix: "/english/",
    children: [
      {
        text: "词汇",
        prefix: "vocabulary/",
        children: ["high-frequency-vocabulary", "root"],
      },
      "grammar",
    ],
  },
  {
    text: "技术",
    icon: "form",
    prefix: "/tech/",
    link: "/tech/",
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
