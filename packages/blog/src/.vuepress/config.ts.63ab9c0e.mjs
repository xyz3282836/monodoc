// src/.vuepress/config.ts
import { defineUserConfig } from "@vuepress/cli";

// src/.vuepress/theme.ts
import { hopeTheme } from "vuepress-theme-hope";

// src/.vuepress/navbar/zh.ts
import { navbar } from "vuepress-theme-hope";
var zhNavbar = navbar([
  "/",
  {
    text: "\u82F1\u6587",
    icon: "note",
    prefix: "/english/",
    children: [
      { text: "\u82F1\u6587\u5B66\u4E60", link: "", icon: "study" },
      {
        text: "\u6BCF\u65E5\u82F1\u6587",
        link: "everyday/",
        icon: "article",
        activeMatch: "^/everyday/$"
      },
      {
        text: "\u8BCD\u6C47",
        prefix: "vocabulary/",
        children: ["high-frequency-vocabulary", "root"]
      },
      "grammar"
    ]
  },
  {
    text: "\u6280\u672F",
    icon: "form",
    prefix: "/tech/",
    link: "/tech/"
  },
  {
    text: "\u8F6F\u4EF6\u6559\u7A0B",
    icon: "software",
    prefix: "/software/",
    children: [
      {
        text: "\u8F6F\u4EF6\u6559\u7A0B",
        icon: "software",
        link: "",
        activeMatch: "^/software/$"
      },
      "vscode/",
      "git/",
      "comsol/"
    ]
  }
]);

// src/.vuepress/sidebar/index.ts
import { sidebar } from "vuepress-theme-hope";

// src/.vuepress/sidebar/english/index.ts
import { arraySidebar } from "vuepress-theme-hope";
var english = arraySidebar([
  "",
  "everyday/",
  "grammar",
  {
    text: "\u8BCD\u6C47",
    prefix: "vocabulary/",
    link: "vocabulary/",
    children: ["high-frequency-vocabulary", "root"]
  }
]);

// src/.vuepress/sidebar/software/comsol.ts
import { arraySidebar as arraySidebar2 } from "vuepress-theme-hope";
var comsol = arraySidebar2([
  "",
  "intro",
  "install",
  "get-started",
  {
    text: "\u51E0\u4F55",
    icon: "geometry",
    prefix: "geometry/",
    link: "geometry/",
    children: ["view", "build"]
  },
  "select",
  "material",
  "physic-field",
  {
    text: "\u7F51\u683C",
    icon: "mesh",
    prefix: "mesh/",
    link: "mesh/",
    children: ["intro"]
  },
  "study",
  "result",
  "app"
]);

// src/.vuepress/sidebar/software/software.ts
import { arraySidebar as arraySidebar3 } from "vuepress-theme-hope";
var software = arraySidebar3([
  "",
  "editor",
  "vscode/",
  "chrome",
  "git/",
  "comsol/",
  {
    text: "\u5DE5\u5177\u8F6F\u4EF6",
    icon: "tool",
    prefix: "tool/",
    children: [
      "",
      "power-toys",
      "powershell",
      {
        text: "Terminal",
        icon: "shell",
        link: "terminal/",
        prefix: "terminal/",
        children: ["get-started", "settings"]
      }
    ]
  },
  "apache",
  "nginx",
  "mysql/"
]);

// src/.vuepress/sidebar/software/vscode.ts
import { arraySidebar as arraySidebar4 } from "vuepress-theme-hope";
var vscode = arraySidebar4([
  "",
  "install",
  "get-started",
  {
    text: "\u7B80\u6613\u6307\u5357",
    icon: "guide",
    prefix: "guide/",
    children: [
      "basic",
      "customization",
      "extension",
      "file",
      "edit",
      "intellisense",
      "git",
      "debug",
      "task",
      "command"
    ]
  },
  "ui",
  "settings",
  "shortcut-key"
]);

// src/.vuepress/sidebar/index.ts
var zhSidebar = sidebar({
  "/software/": software,
  "/software/comsol/": comsol,
  "/software/vscode/": vscode,
  "/software/git/": "structure",
  "/english/": english,
  "/english/everyday/": "structure",
  // fallback
  "/": ["", "english/", "tech/", "software/"]
});

// src/.vuepress/theme.ts
var theme_default = hopeTheme({
  hostname: "https://blog.ruizhou.cf",
  author: {
    name: "ruizhou",
    url: "https://blog.ruizhou.cf"
  },
  iconAssets: "iconfont",
  logo: "/hero.png",
  repo: "xyz3282836/monodoc",
  docsDir: "packages/blog/src",
  docsBranch: "master",
  sidebarSorter: ["readme", "order", "date-desc", "title", "filename"],
  locales: {
    /**
     * Chinese locale config
     */
    "/": {
      // navbar
      navbar: zhNavbar,
      // sidebar
      sidebar: zhSidebar,
      footer: "\u9ED8\u8BA4\u9875\u811A",
      copyright: "MIT \u534F\u8BAE",
      blog: {
        description: "ruizhou blog",
        intro: "/about/me.html",
        medias: {
          Gmail: "mailto:ruizhouliu@gamil.com",
          Zhihu: "https://www.zhihu.com/people/xyz3282836",
          GitHub: "https://github.com/xyz3282836",
          Gitee: "https://gitee.com/xyz3282836"
        }
      }
    }
  },
  displayFooter: true,
  copyright: "Copyright \xA9 2023-present ruizhou",
  plugins: {
    blog: {
      excerptLength: 0
    },
    feed: {
      atom: true,
      json: true,
      rss: true
    },
    comment: {
      provider: "Giscus",
      repo: "xyz3282836/blog",
      repoId: "R_kgDOJEDWqA",
      category: "Announcements",
      categoryId: "DIC_kwDOJEDWqM4CUnXX"
    },
    // all features are enabled for demo, only preserve features you need here
    mdEnhance: {
      align: true,
      attrs: true,
      chart: true,
      codetabs: true,
      container: true,
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
        presets: ["ts", "vue"]
      },
      presentation: {
        plugins: ["highlight", "math", "search", "notes", "zoom"]
      },
      stylize: [
        {
          matcher: "Recommended",
          replacer: ({ tag }) => {
            if (tag === "em")
              return {
                tag: "Badge",
                attrs: { type: "tip" },
                content: "Recommended"
              };
          }
        }
      ],
      sub: true,
      sup: true,
      tabs: true,
      vPre: true,
      vuePlayground: true
    }
    // uncomment these if you want a PWA
    // pwa: {
    //   favicon: "/favicon.ico",
    //   cacheHTML: true,
    //   cachePic: true,
    //   appendBase: true,
    //   apple: {
    //     icon: "/assets/icon/apple-icon-152.png",
    //     statusBarColor: "black",
    //   },
    //   msTile: {
    //     image: "/assets/icon/ms-icon-144.png",
    //     color: "#ffffff",
    //   },
    //   manifest: {
    //     icons: [
    //       {
    //         src: "/assets/icon/chrome-mask-512.png",
    //         sizes: "512x512",
    //         purpose: "maskable",
    //         type: "image/png",
    //       },
    //       {
    //         src: "/assets/icon/chrome-mask-192.png",
    //         sizes: "192x192",
    //         purpose: "maskable",
    //         type: "image/png",
    //       },
    //       {
    //         src: "/assets/icon/chrome-512.png",
    //         sizes: "512x512",
    //         type: "image/png",
    //       },
    //       {
    //         src: "/assets/icon/chrome-192.png",
    //         sizes: "192x192",
    //         type: "image/png",
    //       },
    //     ],
    //     shortcuts: [
    //       {
    //         name: "Demo",
    //         short_name: "Demo",
    //         url: "/demo/",
    //         icons: [
    //           {
    //             src: "/assets/icon/guide-maskable.png",
    //             sizes: "192x192",
    //             purpose: "maskable",
    //             type: "image/png",
    //           },
    //         ],
    //       },
    //     ],
    //   },
    // },
  }
});

// src/.vuepress/config.ts
var config_default = defineUserConfig({
  base: "/",
  locales: {
    "/": {
      lang: "zh-CN",
      title: "rz blog",
      description: "blog for it tech"
    }
  },
  markdown: {
    code: {
      lineNumbers: 10
    }
  },
  theme: theme_default,
  shouldPrefetch: false
});
export {
  config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsic3JjLy52dWVwcmVzcy9jb25maWcudHMiLCAic3JjLy52dWVwcmVzcy90aGVtZS50cyIsICJzcmMvLnZ1ZXByZXNzL25hdmJhci96aC50cyIsICJzcmMvLnZ1ZXByZXNzL3NpZGViYXIvaW5kZXgudHMiLCAic3JjLy52dWVwcmVzcy9zaWRlYmFyL2VuZ2xpc2gvaW5kZXgudHMiLCAic3JjLy52dWVwcmVzcy9zaWRlYmFyL3NvZnR3YXJlL2NvbXNvbC50cyIsICJzcmMvLnZ1ZXByZXNzL3NpZGViYXIvc29mdHdhcmUvc29mdHdhcmUudHMiLCAic3JjLy52dWVwcmVzcy9zaWRlYmFyL3NvZnR3YXJlL3ZzY29kZS50cyJdLAogICJzb3VyY2VzQ29udGVudCI6IFsiY29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2Rpcm5hbWUgPSBcIi9Vc2Vycy96aG91L3dlYi9zcmMvbW9ub2RvYy9wYWNrYWdlcy9ibG9nL3NyYy8udnVlcHJlc3NcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZmlsZW5hbWUgPSBcIi9Vc2Vycy96aG91L3dlYi9zcmMvbW9ub2RvYy9wYWNrYWdlcy9ibG9nL3NyYy8udnVlcHJlc3MvY29uZmlnLnRzXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ltcG9ydF9tZXRhX3VybCA9IFwiZmlsZTovLy9Vc2Vycy96aG91L3dlYi9zcmMvbW9ub2RvYy9wYWNrYWdlcy9ibG9nL3NyYy8udnVlcHJlc3MvY29uZmlnLnRzXCI7aW1wb3J0IHsgZGVmaW5lVXNlckNvbmZpZyB9IGZyb20gXCJAdnVlcHJlc3MvY2xpXCI7XG5pbXBvcnQgdGhlbWUgZnJvbSBcIi4vdGhlbWUuanNcIjtcblxuZXhwb3J0IGRlZmF1bHQgZGVmaW5lVXNlckNvbmZpZyh7XG4gIGJhc2U6IFwiL1wiLFxuXG4gIGxvY2FsZXM6IHtcbiAgICBcIi9cIjoge1xuICAgICAgbGFuZzogXCJ6aC1DTlwiLFxuICAgICAgdGl0bGU6IFwicnogYmxvZ1wiLFxuICAgICAgZGVzY3JpcHRpb246IFwiYmxvZyBmb3IgaXQgdGVjaFwiLFxuICAgIH0sXG4gIH0sXG5cbiAgbWFya2Rvd246IHtcbiAgICBjb2RlOiB7XG4gICAgICBsaW5lTnVtYmVyczogMTAsXG4gICAgfSxcbiAgfSxcblxuICB0aGVtZSxcblxuICBzaG91bGRQcmVmZXRjaDogZmFsc2UsXG59KTtcbiIsICJjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZGlybmFtZSA9IFwiL1VzZXJzL3pob3Uvd2ViL3NyYy9tb25vZG9jL3BhY2thZ2VzL2Jsb2cvc3JjLy52dWVwcmVzc1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9maWxlbmFtZSA9IFwiL1VzZXJzL3pob3Uvd2ViL3NyYy9tb25vZG9jL3BhY2thZ2VzL2Jsb2cvc3JjLy52dWVwcmVzcy90aGVtZS50c1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9pbXBvcnRfbWV0YV91cmwgPSBcImZpbGU6Ly8vVXNlcnMvemhvdS93ZWIvc3JjL21vbm9kb2MvcGFja2FnZXMvYmxvZy9zcmMvLnZ1ZXByZXNzL3RoZW1lLnRzXCI7aW1wb3J0IHsgaG9wZVRoZW1lIH0gZnJvbSBcInZ1ZXByZXNzLXRoZW1lLWhvcGVcIjtcbmltcG9ydCB7IHpoTmF2YmFyIH0gZnJvbSBcIi4vbmF2YmFyL2luZGV4LmpzXCI7XG5pbXBvcnQgeyB6aFNpZGViYXIgfSBmcm9tIFwiLi9zaWRlYmFyL2luZGV4LmpzXCI7XG5cbmV4cG9ydCBkZWZhdWx0IGhvcGVUaGVtZSh7XG4gIGhvc3RuYW1lOiBcImh0dHBzOi8vYmxvZy5ydWl6aG91LmNmXCIsXG5cbiAgYXV0aG9yOiB7XG4gICAgbmFtZTogXCJydWl6aG91XCIsXG4gICAgdXJsOiBcImh0dHBzOi8vYmxvZy5ydWl6aG91LmNmXCIsXG4gIH0sXG5cbiAgaWNvbkFzc2V0czogXCJpY29uZm9udFwiLFxuXG4gIGxvZ286IFwiL2hlcm8ucG5nXCIsXG5cbiAgcmVwbzogXCJ4eXozMjgyODM2L21vbm9kb2NcIixcblxuICBkb2NzRGlyOiBcInBhY2thZ2VzL2Jsb2cvc3JjXCIsXG5cbiAgZG9jc0JyYW5jaDogXCJtYXN0ZXJcIixcblxuICBzaWRlYmFyU29ydGVyOiBbXCJyZWFkbWVcIiwgXCJvcmRlclwiLCBcImRhdGUtZGVzY1wiLCBcInRpdGxlXCIsIFwiZmlsZW5hbWVcIl0sXG5cbiAgbG9jYWxlczoge1xuICAgIC8qKlxuICAgICAqIENoaW5lc2UgbG9jYWxlIGNvbmZpZ1xuICAgICAqL1xuICAgIFwiL1wiOiB7XG4gICAgICAvLyBuYXZiYXJcbiAgICAgIG5hdmJhcjogemhOYXZiYXIsXG5cbiAgICAgIC8vIHNpZGViYXJcbiAgICAgIHNpZGViYXI6IHpoU2lkZWJhcixcblxuICAgICAgZm9vdGVyOiBcIlx1OUVEOFx1OEJBNFx1OTg3NVx1ODExQVwiLFxuXG4gICAgICBjb3B5cmlnaHQ6IFwiTUlUIFx1NTM0Rlx1OEJBRVwiLFxuXG4gICAgICBibG9nOiB7XG4gICAgICAgIGRlc2NyaXB0aW9uOiBcInJ1aXpob3UgYmxvZ1wiLFxuICAgICAgICBpbnRybzogXCIvYWJvdXQvbWUuaHRtbFwiLFxuICAgICAgICBtZWRpYXM6IHtcbiAgICAgICAgICBHbWFpbDogXCJtYWlsdG86cnVpemhvdWxpdUBnYW1pbC5jb21cIixcbiAgICAgICAgICBaaGlodTogXCJodHRwczovL3d3dy56aGlodS5jb20vcGVvcGxlL3h5ejMyODI4MzZcIixcbiAgICAgICAgICBHaXRIdWI6IFwiaHR0cHM6Ly9naXRodWIuY29tL3h5ejMyODI4MzZcIixcbiAgICAgICAgICBHaXRlZTogXCJodHRwczovL2dpdGVlLmNvbS94eXozMjgyODM2XCIsXG4gICAgICAgIH0sXG4gICAgICB9LFxuICAgIH0sXG4gIH0sXG5cbiAgZGlzcGxheUZvb3RlcjogdHJ1ZSxcbiAgY29weXJpZ2h0OiBcIkNvcHlyaWdodCBcdTAwQTkgMjAyMy1wcmVzZW50IHJ1aXpob3VcIixcblxuICBwbHVnaW5zOiB7XG4gICAgYmxvZzoge1xuICAgICAgZXhjZXJwdExlbmd0aDogMCxcbiAgICB9LFxuXG4gICAgZmVlZDoge1xuICAgICAgYXRvbTogdHJ1ZSxcbiAgICAgIGpzb246IHRydWUsXG4gICAgICByc3M6IHRydWUsXG4gICAgfSxcblxuICAgIGNvbW1lbnQ6IHtcbiAgICAgIHByb3ZpZGVyOiBcIkdpc2N1c1wiLFxuICAgICAgcmVwbzogXCJ4eXozMjgyODM2L2Jsb2dcIixcbiAgICAgIHJlcG9JZDogXCJSX2tnRE9KRURXcUFcIixcbiAgICAgIGNhdGVnb3J5OiBcIkFubm91bmNlbWVudHNcIixcbiAgICAgIGNhdGVnb3J5SWQ6IFwiRElDX2t3RE9KRURXcU00Q1VuWFhcIixcbiAgICB9LFxuXG4gICAgLy8gYWxsIGZlYXR1cmVzIGFyZSBlbmFibGVkIGZvciBkZW1vLCBvbmx5IHByZXNlcnZlIGZlYXR1cmVzIHlvdSBuZWVkIGhlcmVcbiAgICBtZEVuaGFuY2U6IHtcbiAgICAgIGFsaWduOiB0cnVlLFxuICAgICAgYXR0cnM6IHRydWUsXG4gICAgICBjaGFydDogdHJ1ZSxcbiAgICAgIGNvZGV0YWJzOiB0cnVlLFxuICAgICAgY29udGFpbmVyOiB0cnVlLFxuICAgICAgZGVtbzogdHJ1ZSxcbiAgICAgIGVjaGFydHM6IHRydWUsXG4gICAgICBmaWd1cmU6IHRydWUsXG4gICAgICBmbG93Y2hhcnQ6IHRydWUsXG4gICAgICBnZm06IHRydWUsXG4gICAgICBpbWdMYXp5bG9hZDogdHJ1ZSxcbiAgICAgIGltZ1NpemU6IHRydWUsXG4gICAgICBpbmNsdWRlOiB0cnVlLFxuICAgICAga2F0ZXg6IHRydWUsXG4gICAgICBtYXJrOiB0cnVlLFxuICAgICAgbWVybWFpZDogdHJ1ZSxcbiAgICAgIHBsYXlncm91bmQ6IHtcbiAgICAgICAgcHJlc2V0czogW1widHNcIiwgXCJ2dWVcIl0sXG4gICAgICB9LFxuICAgICAgcHJlc2VudGF0aW9uOiB7XG4gICAgICAgIHBsdWdpbnM6IFtcImhpZ2hsaWdodFwiLCBcIm1hdGhcIiwgXCJzZWFyY2hcIiwgXCJub3Rlc1wiLCBcInpvb21cIl0sXG4gICAgICB9LFxuICAgICAgc3R5bGl6ZTogW1xuICAgICAgICB7XG4gICAgICAgICAgbWF0Y2hlcjogXCJSZWNvbW1lbmRlZFwiLFxuICAgICAgICAgIHJlcGxhY2VyOiAoeyB0YWcgfSkgPT4ge1xuICAgICAgICAgICAgaWYgKHRhZyA9PT0gXCJlbVwiKVxuICAgICAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgICAgIHRhZzogXCJCYWRnZVwiLFxuICAgICAgICAgICAgICAgIGF0dHJzOiB7IHR5cGU6IFwidGlwXCIgfSxcbiAgICAgICAgICAgICAgICBjb250ZW50OiBcIlJlY29tbWVuZGVkXCIsXG4gICAgICAgICAgICAgIH07XG4gICAgICAgICAgfSxcbiAgICAgICAgfSxcbiAgICAgIF0sXG4gICAgICBzdWI6IHRydWUsXG4gICAgICBzdXA6IHRydWUsXG4gICAgICB0YWJzOiB0cnVlLFxuICAgICAgdlByZTogdHJ1ZSxcbiAgICAgIHZ1ZVBsYXlncm91bmQ6IHRydWUsXG4gICAgfSxcblxuICAgIC8vIHVuY29tbWVudCB0aGVzZSBpZiB5b3Ugd2FudCBhIFBXQVxuICAgIC8vIHB3YToge1xuICAgIC8vICAgZmF2aWNvbjogXCIvZmF2aWNvbi5pY29cIixcbiAgICAvLyAgIGNhY2hlSFRNTDogdHJ1ZSxcbiAgICAvLyAgIGNhY2hlUGljOiB0cnVlLFxuICAgIC8vICAgYXBwZW5kQmFzZTogdHJ1ZSxcbiAgICAvLyAgIGFwcGxlOiB7XG4gICAgLy8gICAgIGljb246IFwiL2Fzc2V0cy9pY29uL2FwcGxlLWljb24tMTUyLnBuZ1wiLFxuICAgIC8vICAgICBzdGF0dXNCYXJDb2xvcjogXCJibGFja1wiLFxuICAgIC8vICAgfSxcbiAgICAvLyAgIG1zVGlsZToge1xuICAgIC8vICAgICBpbWFnZTogXCIvYXNzZXRzL2ljb24vbXMtaWNvbi0xNDQucG5nXCIsXG4gICAgLy8gICAgIGNvbG9yOiBcIiNmZmZmZmZcIixcbiAgICAvLyAgIH0sXG4gICAgLy8gICBtYW5pZmVzdDoge1xuICAgIC8vICAgICBpY29uczogW1xuICAgIC8vICAgICAgIHtcbiAgICAvLyAgICAgICAgIHNyYzogXCIvYXNzZXRzL2ljb24vY2hyb21lLW1hc2stNTEyLnBuZ1wiLFxuICAgIC8vICAgICAgICAgc2l6ZXM6IFwiNTEyeDUxMlwiLFxuICAgIC8vICAgICAgICAgcHVycG9zZTogXCJtYXNrYWJsZVwiLFxuICAgIC8vICAgICAgICAgdHlwZTogXCJpbWFnZS9wbmdcIixcbiAgICAvLyAgICAgICB9LFxuICAgIC8vICAgICAgIHtcbiAgICAvLyAgICAgICAgIHNyYzogXCIvYXNzZXRzL2ljb24vY2hyb21lLW1hc2stMTkyLnBuZ1wiLFxuICAgIC8vICAgICAgICAgc2l6ZXM6IFwiMTkyeDE5MlwiLFxuICAgIC8vICAgICAgICAgcHVycG9zZTogXCJtYXNrYWJsZVwiLFxuICAgIC8vICAgICAgICAgdHlwZTogXCJpbWFnZS9wbmdcIixcbiAgICAvLyAgICAgICB9LFxuICAgIC8vICAgICAgIHtcbiAgICAvLyAgICAgICAgIHNyYzogXCIvYXNzZXRzL2ljb24vY2hyb21lLTUxMi5wbmdcIixcbiAgICAvLyAgICAgICAgIHNpemVzOiBcIjUxMng1MTJcIixcbiAgICAvLyAgICAgICAgIHR5cGU6IFwiaW1hZ2UvcG5nXCIsXG4gICAgLy8gICAgICAgfSxcbiAgICAvLyAgICAgICB7XG4gICAgLy8gICAgICAgICBzcmM6IFwiL2Fzc2V0cy9pY29uL2Nocm9tZS0xOTIucG5nXCIsXG4gICAgLy8gICAgICAgICBzaXplczogXCIxOTJ4MTkyXCIsXG4gICAgLy8gICAgICAgICB0eXBlOiBcImltYWdlL3BuZ1wiLFxuICAgIC8vICAgICAgIH0sXG4gICAgLy8gICAgIF0sXG4gICAgLy8gICAgIHNob3J0Y3V0czogW1xuICAgIC8vICAgICAgIHtcbiAgICAvLyAgICAgICAgIG5hbWU6IFwiRGVtb1wiLFxuICAgIC8vICAgICAgICAgc2hvcnRfbmFtZTogXCJEZW1vXCIsXG4gICAgLy8gICAgICAgICB1cmw6IFwiL2RlbW8vXCIsXG4gICAgLy8gICAgICAgICBpY29uczogW1xuICAgIC8vICAgICAgICAgICB7XG4gICAgLy8gICAgICAgICAgICAgc3JjOiBcIi9hc3NldHMvaWNvbi9ndWlkZS1tYXNrYWJsZS5wbmdcIixcbiAgICAvLyAgICAgICAgICAgICBzaXplczogXCIxOTJ4MTkyXCIsXG4gICAgLy8gICAgICAgICAgICAgcHVycG9zZTogXCJtYXNrYWJsZVwiLFxuICAgIC8vICAgICAgICAgICAgIHR5cGU6IFwiaW1hZ2UvcG5nXCIsXG4gICAgLy8gICAgICAgICAgIH0sXG4gICAgLy8gICAgICAgICBdLFxuICAgIC8vICAgICAgIH0sXG4gICAgLy8gICAgIF0sXG4gICAgLy8gICB9LFxuICAgIC8vIH0sXG4gIH0sXG59KTtcbiIsICJjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZGlybmFtZSA9IFwiL1VzZXJzL3pob3Uvd2ViL3NyYy9tb25vZG9jL3BhY2thZ2VzL2Jsb2cvc3JjLy52dWVwcmVzcy9uYXZiYXJcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZmlsZW5hbWUgPSBcIi9Vc2Vycy96aG91L3dlYi9zcmMvbW9ub2RvYy9wYWNrYWdlcy9ibG9nL3NyYy8udnVlcHJlc3MvbmF2YmFyL3poLnRzXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ltcG9ydF9tZXRhX3VybCA9IFwiZmlsZTovLy9Vc2Vycy96aG91L3dlYi9zcmMvbW9ub2RvYy9wYWNrYWdlcy9ibG9nL3NyYy8udnVlcHJlc3MvbmF2YmFyL3poLnRzXCI7aW1wb3J0IHsgbmF2YmFyIH0gZnJvbSBcInZ1ZXByZXNzLXRoZW1lLWhvcGVcIjtcblxuZXhwb3J0IGNvbnN0IHpoTmF2YmFyID0gbmF2YmFyKFtcbiAgXCIvXCIsXG4gIHtcbiAgICB0ZXh0OiBcIlx1ODJGMVx1NjU4N1wiLFxuICAgIGljb246IFwibm90ZVwiLFxuICAgIHByZWZpeDogXCIvZW5nbGlzaC9cIixcbiAgICBjaGlsZHJlbjogW1xuICAgICAgeyB0ZXh0OiBcIlx1ODJGMVx1NjU4N1x1NUI2Nlx1NEU2MFwiLCBsaW5rOiBcIlwiLCBpY29uOiBcInN0dWR5XCIgfSxcbiAgICAgIHtcbiAgICAgICAgdGV4dDogXCJcdTZCQ0ZcdTY1RTVcdTgyRjFcdTY1ODdcIixcbiAgICAgICAgbGluazogXCJldmVyeWRheS9cIixcbiAgICAgICAgaWNvbjogXCJhcnRpY2xlXCIsXG4gICAgICAgIGFjdGl2ZU1hdGNoOiBcIl4vZXZlcnlkYXkvJFwiLFxuICAgICAgfSxcbiAgICAgIHtcbiAgICAgICAgdGV4dDogXCJcdThCQ0RcdTZDNDdcIixcbiAgICAgICAgcHJlZml4OiBcInZvY2FidWxhcnkvXCIsXG4gICAgICAgIGNoaWxkcmVuOiBbXCJoaWdoLWZyZXF1ZW5jeS12b2NhYnVsYXJ5XCIsIFwicm9vdFwiXSxcbiAgICAgIH0sXG4gICAgICBcImdyYW1tYXJcIixcbiAgICBdLFxuICB9LFxuICB7XG4gICAgdGV4dDogXCJcdTYyODBcdTY3MkZcIixcbiAgICBpY29uOiBcImZvcm1cIixcbiAgICBwcmVmaXg6IFwiL3RlY2gvXCIsXG4gICAgbGluazogXCIvdGVjaC9cIixcbiAgfSxcbiAge1xuICAgIHRleHQ6IFwiXHU4RjZGXHU0RUY2XHU2NTU5XHU3QTBCXCIsXG4gICAgaWNvbjogXCJzb2Z0d2FyZVwiLFxuICAgIHByZWZpeDogXCIvc29mdHdhcmUvXCIsXG4gICAgY2hpbGRyZW46IFtcbiAgICAgIHtcbiAgICAgICAgdGV4dDogXCJcdThGNkZcdTRFRjZcdTY1NTlcdTdBMEJcIixcbiAgICAgICAgaWNvbjogXCJzb2Z0d2FyZVwiLFxuICAgICAgICBsaW5rOiBcIlwiLFxuICAgICAgICBhY3RpdmVNYXRjaDogXCJeL3NvZnR3YXJlLyRcIixcbiAgICAgIH0sXG4gICAgICBcInZzY29kZS9cIixcbiAgICAgIFwiZ2l0L1wiLFxuICAgICAgXCJjb21zb2wvXCIsXG4gICAgXSxcbiAgfSxcbl0pO1xuIiwgImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCIvVXNlcnMvemhvdS93ZWIvc3JjL21vbm9kb2MvcGFja2FnZXMvYmxvZy9zcmMvLnZ1ZXByZXNzL3NpZGViYXJcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZmlsZW5hbWUgPSBcIi9Vc2Vycy96aG91L3dlYi9zcmMvbW9ub2RvYy9wYWNrYWdlcy9ibG9nL3NyYy8udnVlcHJlc3Mvc2lkZWJhci9pbmRleC50c1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9pbXBvcnRfbWV0YV91cmwgPSBcImZpbGU6Ly8vVXNlcnMvemhvdS93ZWIvc3JjL21vbm9kb2MvcGFja2FnZXMvYmxvZy9zcmMvLnZ1ZXByZXNzL3NpZGViYXIvaW5kZXgudHNcIjtpbXBvcnQgeyBzaWRlYmFyIH0gZnJvbSBcInZ1ZXByZXNzLXRoZW1lLWhvcGVcIjtcbmltcG9ydCB7IGVuZ2xpc2ggfSBmcm9tIFwiLi9lbmdsaXNoL2luZGV4LmpzXCI7XG5pbXBvcnQgeyBjb21zb2wsIHNvZnR3YXJlLCB2c2NvZGUgfSBmcm9tIFwiLi9zb2Z0d2FyZS9pbmRleC5qc1wiO1xuXG5leHBvcnQgY29uc3QgemhTaWRlYmFyID0gc2lkZWJhcih7XG4gIFwiL3NvZnR3YXJlL1wiOiBzb2Z0d2FyZSxcbiAgXCIvc29mdHdhcmUvY29tc29sL1wiOiBjb21zb2wsXG4gIFwiL3NvZnR3YXJlL3ZzY29kZS9cIjogdnNjb2RlLFxuICBcIi9zb2Z0d2FyZS9naXQvXCI6IFwic3RydWN0dXJlXCIsXG5cbiAgXCIvZW5nbGlzaC9cIjogZW5nbGlzaCxcbiAgXCIvZW5nbGlzaC9ldmVyeWRheS9cIjogXCJzdHJ1Y3R1cmVcIixcblxuICAvLyBmYWxsYmFja1xuICBcIi9cIjogW1wiXCIsIFwiZW5nbGlzaC9cIiwgXCJ0ZWNoL1wiLCBcInNvZnR3YXJlL1wiXSxcbn0pO1xuIiwgImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCIvVXNlcnMvemhvdS93ZWIvc3JjL21vbm9kb2MvcGFja2FnZXMvYmxvZy9zcmMvLnZ1ZXByZXNzL3NpZGViYXIvZW5nbGlzaFwiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9maWxlbmFtZSA9IFwiL1VzZXJzL3pob3Uvd2ViL3NyYy9tb25vZG9jL3BhY2thZ2VzL2Jsb2cvc3JjLy52dWVwcmVzcy9zaWRlYmFyL2VuZ2xpc2gvaW5kZXgudHNcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfaW1wb3J0X21ldGFfdXJsID0gXCJmaWxlOi8vL1VzZXJzL3pob3Uvd2ViL3NyYy9tb25vZG9jL3BhY2thZ2VzL2Jsb2cvc3JjLy52dWVwcmVzcy9zaWRlYmFyL2VuZ2xpc2gvaW5kZXgudHNcIjtpbXBvcnQgeyBhcnJheVNpZGViYXIgfSBmcm9tIFwidnVlcHJlc3MtdGhlbWUtaG9wZVwiO1xuXG5leHBvcnQgY29uc3QgZW5nbGlzaCA9IGFycmF5U2lkZWJhcihbXG4gIFwiXCIsXG4gIFwiZXZlcnlkYXkvXCIsXG4gIFwiZ3JhbW1hclwiLFxuICB7XG4gICAgdGV4dDogXCJcdThCQ0RcdTZDNDdcIixcbiAgICBwcmVmaXg6IFwidm9jYWJ1bGFyeS9cIixcbiAgICBsaW5rOiBcInZvY2FidWxhcnkvXCIsXG4gICAgY2hpbGRyZW46IFtcImhpZ2gtZnJlcXVlbmN5LXZvY2FidWxhcnlcIiwgXCJyb290XCJdLFxuICB9LFxuXSk7XG4iLCAiY29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2Rpcm5hbWUgPSBcIi9Vc2Vycy96aG91L3dlYi9zcmMvbW9ub2RvYy9wYWNrYWdlcy9ibG9nL3NyYy8udnVlcHJlc3Mvc2lkZWJhci9zb2Z0d2FyZVwiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9maWxlbmFtZSA9IFwiL1VzZXJzL3pob3Uvd2ViL3NyYy9tb25vZG9jL3BhY2thZ2VzL2Jsb2cvc3JjLy52dWVwcmVzcy9zaWRlYmFyL3NvZnR3YXJlL2NvbXNvbC50c1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9pbXBvcnRfbWV0YV91cmwgPSBcImZpbGU6Ly8vVXNlcnMvemhvdS93ZWIvc3JjL21vbm9kb2MvcGFja2FnZXMvYmxvZy9zcmMvLnZ1ZXByZXNzL3NpZGViYXIvc29mdHdhcmUvY29tc29sLnRzXCI7aW1wb3J0IHsgYXJyYXlTaWRlYmFyIH0gZnJvbSBcInZ1ZXByZXNzLXRoZW1lLWhvcGVcIjtcblxuZXhwb3J0IGNvbnN0IGNvbXNvbCA9IGFycmF5U2lkZWJhcihbXG4gIFwiXCIsXG4gIFwiaW50cm9cIixcbiAgXCJpbnN0YWxsXCIsXG4gIFwiZ2V0LXN0YXJ0ZWRcIixcbiAge1xuICAgIHRleHQ6IFwiXHU1MUUwXHU0RjU1XCIsXG4gICAgaWNvbjogXCJnZW9tZXRyeVwiLFxuICAgIHByZWZpeDogXCJnZW9tZXRyeS9cIixcbiAgICBsaW5rOiBcImdlb21ldHJ5L1wiLFxuICAgIGNoaWxkcmVuOiBbXCJ2aWV3XCIsIFwiYnVpbGRcIl0sXG4gIH0sXG4gIFwic2VsZWN0XCIsXG4gIFwibWF0ZXJpYWxcIixcbiAgXCJwaHlzaWMtZmllbGRcIixcbiAge1xuICAgIHRleHQ6IFwiXHU3RjUxXHU2ODNDXCIsXG4gICAgaWNvbjogXCJtZXNoXCIsXG4gICAgcHJlZml4OiBcIm1lc2gvXCIsXG4gICAgbGluazogXCJtZXNoL1wiLFxuICAgIGNoaWxkcmVuOiBbXCJpbnRyb1wiXSxcbiAgfSxcbiAgXCJzdHVkeVwiLFxuICBcInJlc3VsdFwiLFxuICBcImFwcFwiLFxuXSk7XG4iLCAiY29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2Rpcm5hbWUgPSBcIi9Vc2Vycy96aG91L3dlYi9zcmMvbW9ub2RvYy9wYWNrYWdlcy9ibG9nL3NyYy8udnVlcHJlc3Mvc2lkZWJhci9zb2Z0d2FyZVwiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9maWxlbmFtZSA9IFwiL1VzZXJzL3pob3Uvd2ViL3NyYy9tb25vZG9jL3BhY2thZ2VzL2Jsb2cvc3JjLy52dWVwcmVzcy9zaWRlYmFyL3NvZnR3YXJlL3NvZnR3YXJlLnRzXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ltcG9ydF9tZXRhX3VybCA9IFwiZmlsZTovLy9Vc2Vycy96aG91L3dlYi9zcmMvbW9ub2RvYy9wYWNrYWdlcy9ibG9nL3NyYy8udnVlcHJlc3Mvc2lkZWJhci9zb2Z0d2FyZS9zb2Z0d2FyZS50c1wiO2ltcG9ydCB7IGFycmF5U2lkZWJhciB9IGZyb20gXCJ2dWVwcmVzcy10aGVtZS1ob3BlXCI7XG5cbmV4cG9ydCBjb25zdCBzb2Z0d2FyZSA9IGFycmF5U2lkZWJhcihbXG4gIFwiXCIsXG4gIFwiZWRpdG9yXCIsXG4gIFwidnNjb2RlL1wiLFxuICBcImNocm9tZVwiLFxuICBcImdpdC9cIixcbiAgXCJjb21zb2wvXCIsXG4gIHtcbiAgICB0ZXh0OiBcIlx1NURFNVx1NTE3N1x1OEY2Rlx1NEVGNlwiLFxuICAgIGljb246IFwidG9vbFwiLFxuICAgIHByZWZpeDogXCJ0b29sL1wiLFxuICAgIGNoaWxkcmVuOiBbXG4gICAgICBcIlwiLFxuICAgICAgXCJwb3dlci10b3lzXCIsXG4gICAgICBcInBvd2Vyc2hlbGxcIixcbiAgICAgIHtcbiAgICAgICAgdGV4dDogXCJUZXJtaW5hbFwiLFxuICAgICAgICBpY29uOiBcInNoZWxsXCIsXG4gICAgICAgIGxpbms6IFwidGVybWluYWwvXCIsXG4gICAgICAgIHByZWZpeDogXCJ0ZXJtaW5hbC9cIixcbiAgICAgICAgY2hpbGRyZW46IFtcImdldC1zdGFydGVkXCIsIFwic2V0dGluZ3NcIl0sXG4gICAgICB9LFxuICAgIF0sXG4gIH0sXG4gIFwiYXBhY2hlXCIsXG4gIFwibmdpbnhcIixcbiAgXCJteXNxbC9cIixcbl0pO1xuIiwgImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCIvVXNlcnMvemhvdS93ZWIvc3JjL21vbm9kb2MvcGFja2FnZXMvYmxvZy9zcmMvLnZ1ZXByZXNzL3NpZGViYXIvc29mdHdhcmVcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZmlsZW5hbWUgPSBcIi9Vc2Vycy96aG91L3dlYi9zcmMvbW9ub2RvYy9wYWNrYWdlcy9ibG9nL3NyYy8udnVlcHJlc3Mvc2lkZWJhci9zb2Z0d2FyZS92c2NvZGUudHNcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfaW1wb3J0X21ldGFfdXJsID0gXCJmaWxlOi8vL1VzZXJzL3pob3Uvd2ViL3NyYy9tb25vZG9jL3BhY2thZ2VzL2Jsb2cvc3JjLy52dWVwcmVzcy9zaWRlYmFyL3NvZnR3YXJlL3ZzY29kZS50c1wiO2ltcG9ydCB7IGFycmF5U2lkZWJhciB9IGZyb20gXCJ2dWVwcmVzcy10aGVtZS1ob3BlXCI7XG5cbmV4cG9ydCBjb25zdCB2c2NvZGUgPSBhcnJheVNpZGViYXIoW1xuICBcIlwiLFxuICBcImluc3RhbGxcIixcbiAgXCJnZXQtc3RhcnRlZFwiLFxuICB7XG4gICAgdGV4dDogXCJcdTdCODBcdTY2MTNcdTYzMDdcdTUzNTdcIixcbiAgICBpY29uOiBcImd1aWRlXCIsXG4gICAgcHJlZml4OiBcImd1aWRlL1wiLFxuICAgIGNoaWxkcmVuOiBbXG4gICAgICBcImJhc2ljXCIsXG4gICAgICBcImN1c3RvbWl6YXRpb25cIixcbiAgICAgIFwiZXh0ZW5zaW9uXCIsXG4gICAgICBcImZpbGVcIixcbiAgICAgIFwiZWRpdFwiLFxuICAgICAgXCJpbnRlbGxpc2Vuc2VcIixcbiAgICAgIFwiZ2l0XCIsXG4gICAgICBcImRlYnVnXCIsXG4gICAgICBcInRhc2tcIixcbiAgICAgIFwiY29tbWFuZFwiLFxuICAgIF0sXG4gIH0sXG4gIFwidWlcIixcbiAgXCJzZXR0aW5nc1wiLFxuICBcInNob3J0Y3V0LWtleVwiLFxuXSk7XG4iXSwKICAibWFwcGluZ3MiOiAiO0FBQTZVLFNBQVMsd0JBQXdCOzs7QUNBbkMsU0FBUyxpQkFBaUI7OztBQ0FYLFNBQVMsY0FBYztBQUUxVyxJQUFNLFdBQVcsT0FBTztBQUFBLEVBQzdCO0FBQUEs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O0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsRUEwREY7QUFDRixDQUFDOzs7QUQ1S0QsSUFBTyxpQkFBUSxpQkFBaUI7QUFBQSxFQUM5QixNQUFNO0FBQUEsRUFFTixTQUFTO0FBQUEsSUFDUCxLQUFLO0FBQUEsTUFDSCxNQUFNO0FBQUEsTUFDTixPQUFPO0FBQUEsTUFDUCxhQUFhO0FBQUEsSUFDZjtBQUFBLEVBQ0Y7QUFBQSxFQUVBLFVBQVU7QUFBQSxJQUNSLE1BQU07QUFBQSxNQUNKLGFBQWE7QUFBQSxJQUNmO0FBQUEsRUFDRjtBQUFBLEVBRUE7QUFBQSxFQUVBLGdCQUFnQjtBQUNsQixDQUFDOyIsCiAgIm5hbWVzIjogWyJhcnJheVNpZGViYXIiLCAiYXJyYXlTaWRlYmFyIiwgImFycmF5U2lkZWJhciIsICJhcnJheVNpZGViYXIiLCAiYXJyYXlTaWRlYmFyIiwgImFycmF5U2lkZWJhciJdCn0K
