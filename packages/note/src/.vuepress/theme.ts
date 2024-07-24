import { hopeTheme } from "vuepress-theme-hope";
import { zhNavbar } from "./navbar/index.js";
import { zhSidebar } from "./sidebar/index.js";

export default hopeTheme({
  hostname: "https://www.ruizhou.cf",

  author: {
    name: "rz",
    url: "https://github.com/xyz3282836/monodoc",
  },

  logo: "/hero.png",

  repo: "xyz3282836/monodoc",

  docsDir: "packages/note/src",

  docsBranch: "master",

  fullscreen: true,

  locales: {
    "/": {
      // navbar
      navbar: zhNavbar,

      // sidebar
      sidebar: zhSidebar,

      footer: "默认页脚",

      displayFooter: true,

      metaLocales: {
        editLink: "Edit this page on GitHub",
      },
    },
  },

  encrypt: {
    config: {
      "/root/面试.html": ["123456xxx"],
    },
  },

  plugins: {
    blog: {},
    // comment: {
    //   // @ts-expect-error: You should generate and use your own comment service
    //   provider: "Waline",
    // },

    // all features are enabled for demo, only preserve features you need here
    mdEnhance: {
      align: true,
      codetabs: true,
      demo: true,
      figure: true,
      flowchart: true,
      footnote: true,
      imgLazyload: true,
      imgMark: true,
      imgSize: true,
      mathjax: true,
      mermaid: true,
      revealJs: true,
      sub: true,
      sup: true,
      vPre: true,
    },
  },
});
