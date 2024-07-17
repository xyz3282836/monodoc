import type { UserConfig } from "vuepress";
import { defineUserConfig } from "vuepress";
import { appendDatePlugin } from "@vuepress/plugin-append-date";

import theme from "./theme.js";

export default <UserConfig>defineUserConfig({
  base: "/",

  locales: {
    "/": {
      lang: "zh-CN",
      title: "rz blog",
      description: "blog for it tech",
    },
  },

  markdown: {
    headers: {
      // 用到哪一级就提取哪一级
      level: [2, 3, 4, 5, 6],
    },
    code: {
      lineNumbers: 10,
    },
  },

  theme,

  plugins: [appendDatePlugin()],

  shouldPrefetch: false,

});
