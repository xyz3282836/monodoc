import { sidebar } from "vuepress-theme-hope";

export const zhSidebar = sidebar({
  "/": [
    "",
    {
      text: "Go",
      prefix: "go/",
      children: "structure",
      collapsible: true,
    },
    {
      text: "源码解读",
      prefix: "source-code/",
      children: "structure",
      collapsible: true,
    },
    {
      text: "Unix环境高级编程",
      prefix: "apue/",
      children: "structure",
      collapsible: true,
    },
    {
      text: "Liunx",
      prefix: "linux/",
      children: "structure",
      collapsible: true,
    },
    {
      text: "算法",
      prefix: "algorithms/",
      children: "structure",
      collapsible: true,
    },
    {
      text: "数据结构",
      prefix: "data-structure/",
      children: "structure",
      collapsible: true,
    },
    {
      text: "操作系统",
      prefix: "opreating-system/",
      children: "structure",
      collapsible: true,
    },
    {
      text: "技术",
      prefix: "tech/",
      children: "structure",
      collapsible: true,
    },
    {
      text: "领域设计",
      prefix: "ddd/",
      children: "structure",
      collapsible: true,
    },
    {
      text: "术语",
      prefix: "technical-term/",
      children: "structure",
      collapsible: true,
    },
    {
      text: "性能之巅",
      prefix: "systemc-performance/",
      children: "structure",
      collapsible: true,
    },
    {
      text: "其他",
      prefix: "other/",
      children: "structure",
      collapsible: true,
    },
    {
      text: "待办",
      prefix: "todo/",
      children: "structure",
      collapsible: true,
    },
  ],

  // "/go/": "structure",
  "/source-code/": "structure",
  // "/apue/": "structure",
  // "/linux/": "structure",
  // // "/algorithms/": "structure",
  // "/data-structure/": "structure",
  // // "/opreating-system/": "structure",
  // "/tech/": "structure",
  // // "/ddd/": "structure",
  // // "/technical-term/": "structure",
  // // "/systemc-performance/": "structure",
  // "/other/": "structure",
  // "/todo/": "structure",
});
