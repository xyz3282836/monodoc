import { hopeTheme } from "vuepress-theme-hope";
import { zhNavbar } from "./navbar/index.js";
import { zhSidebar } from "./sidebar/index.js";

export default hopeTheme({
  hostname: "https://blog.ruizhou.cf",

  author: {
    name: "ruizhou",
    url: "https://blog.ruizhou.cf",
  },

  favicon: "/favicon.ico",

  iconAssets: "//at.alicdn.com/t/font_2410206_vuzkjonf4s9.css",

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
  copyright: "Copyright © 2023-present ruizhou",

  plugins: {
    blog: {
      excerptLength: 0,
    },

    // 开启数学支持，比如公式等
    markdownMath: true,

    markdownTab: {
      tabs: true,
      codeTabs: true,
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

    mdEnhance: {
      align: true,
      demo: true,
      flowchart: true,
      footnote: true,
      mermaid: true,
      sub: true,
      sup: true,
      vPre: true
    },

    searchPro: {
      // 索引全部内容
      indexContent: true,
      // 为分类和标签添加索引
      customFields: [
        {
          getter: (page) => page.frontmatter.category,
          formatter: "分类：$content",
        },
        {
          getter: (page) => page.frontmatter.tag,
          formatter: "标签：$content",
        },
      ],
    },
  },
});
