import { defineUserConfig } from "@vuepress/cli";
// import { searchProPlugin } from "vuepress-plugin-search-pro";
import theme from "./theme.js";

export default defineUserConfig({
  base: "/",

  locales: {
    "/": {
      lang: "zh-CN",
      title: "rz blog",
      description: "blog for it tech",
    },
  },

  markdown: {
    code: {
      lineNumbers: 10,
    },
  },

  theme,

  shouldPrefetch: false,

  // plugins: [
  //   searchProPlugin({
  //     // 索引全部内容
  //     indexContent: true,
  //     // 为分类和标签添加索引
  //     customFields: [
  //       {
  //         getter: (page) => page.frontmatter.category,
  //         formatter: "分类：$content",
  //       },
  //       {
  //         getter: (page) => page.frontmatter.tag,
  //         formatter: "标签：$content",
  //       },
  //     ],
  //   }),
  // ],
});
