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
  
  iconAssets: "iconfont",

  logo: "/hero.png",

  repo: "xyz3282836/monodoc",

  docsDir: "packages/blog/src",

  docsBranch: "master",

  sidebarSorter: ["readme", "order", "date-desc", "title", "filename"],

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

    components: {
      components: [
        "ArtPlayer",
        "Badge",
        "BiliBili",
        "CodePen",
        "PDF",
        "Replit",
        "SiteInfo",
        "StackBlitz",
        "VidStack",
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

    // all features are enabled for demo, only preserve features you need here
    mdEnhance: {
      align: true,
      attrs: true,
      chart: true,
      codetabs: true,
      demo: true,
      echarts: true,
      figure: true,
      flowchart: true,
      gfm: true,
      imgLazyload: true,
      imgSize: true,
      include: true,
      katex: true,
      mark: true,
      mermaid: true,
      playground: {
        presets: ["ts", "vue"],
      },
      // presentation: ["highlight", "math", "search", "notes", "zoom"],
      stylize: [
        {
          matcher: "Recommended",
          replacer: ({ tag }) => {
            if (tag === "em")
              return {
                tag: "Badge",
                attrs: { type: "tip" },
                content: "Recommended",
              };
          },
        },
      ],
      sub: true,
      sup: true,
      tabs: true,
      vPre: true,
      vuePlayground: true,
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
