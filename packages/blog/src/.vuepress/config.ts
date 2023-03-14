import { defineUserConfig } from "@vuepress/cli";
import { searchProPlugin } from "vuepress-plugin-search-pro";
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

  plugins: [
    searchProPlugin({
      indexContent: true,
    }),
  ],
});
