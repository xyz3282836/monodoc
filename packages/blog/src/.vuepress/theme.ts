import { hopeTheme } from "vuepress-theme-hope";
import { zhNavbar } from "./navbar/index.js";
import { zhSidebar } from "./sidebar/index.js";

export default hopeTheme(
  {
    hostname: "https://blog.ruizhou.cf",

    author: {
      name: "ruizhou",
      url: "https://blog.ruizhou.cf",
    },

    favicon: "/favicon.ico",

    iconAssets: [
      "//at.alicdn.com/t/c/font_4728484_srrcjkvxbe.css",
      "//at.alicdn.com/t/c/font_4728484_yu56xjgshml.css"
    ],

    logo: "/hero.png",

    repo: "xyz3282836/monodoc",

    docsDir: "packages/blog/src",

    docsBranch: "master",

    sidebarSorter: ["readme", "order", "date-desc", "title", "filename"],

    headerDepth: 6,

    fullscreen: true,

    locales: {
      /**
       * Chinese locale config
       */
      "/": {
        // navbar
        navbar: zhNavbar,

        // sidebar
        sidebar: zhSidebar,

        footer: "默认页脚",

        copyright: "MIT 协议",

        blog: {
          description: "ruizhou blog",
          intro: "/about/me.html",
          medias: {
            Gmail: "mailto:ruizhouliu@gamil.com",
            Zhihu: "https://www.zhihu.com/people/xyz3282836",
            GitHub: "https://github.com/xyz3282836",
            Gitee: "https://gitee.com/xyz3282836",
          },
        },
      },
    },

    displayFooter: true,
    copyright: "Copyright © 2025-present ruizhou",

    markdown: {
      align: true,
      codeTabs: true,
      demo: true,
      figure: true,
      flowchart: true,
      highlighter: {
        type: "shiki",
        lineNumbers: 10,
        langAlias: {
          conf: "ini",
        },
      },
      imgLazyload: true,
      imgMark: true,
      imgSize: true,
      footnote: true,
      mermaid: true,
      revealjs: true,
      sub: true,
      sup: true,
      tabs: true,
      vPre: true,
      // 开启数学支持，比如公式等
      math: true,
    },

    plugins: {
      blog: {
        excerptLength: 0,
      },

      components: {
        components: [
          "Badge",
          "BiliBili"
        ],
      },

      copyright: true,

      feed: {
        atom: true,
        json: true,
        rss: true,
      },

      comment: {
        provider: "Giscus",
        repo: "xyz3282836/blog",
        repoId: "R_kgDOJEDWqA",
        category: "Announcements",
        categoryId: "DIC_kwDOJEDWqM4CUnXX",
      },
      slimsearch: {
        indexContent: true,
      }
    },
  },
  false,
);
