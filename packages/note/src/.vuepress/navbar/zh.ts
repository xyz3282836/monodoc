import { navbar } from "vuepress-theme-hope";

export const zhNavbar = navbar([
  "/",
  { text: "文档", icon: "note", link: "/raw/" },
  {
    text: "GO",
    icon: "creative",
    prefix: "/raw/Go/",
    children: [
      {
        text: "Go汇编",
        icon: "creative",
        prefix: "Go汇编/",
        children: ["dlv命令", { text: "plan9", icon: "", link: "plan9/" }],
      },
    ],
  },
]);
