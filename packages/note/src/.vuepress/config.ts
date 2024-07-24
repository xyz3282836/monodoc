import { appendDatePlugin } from "@vuepress/plugin-append-date";
import { defineUserConfig } from "vuepress";

import theme from "./theme.js";

export default defineUserConfig({
  base: "/",

  locales: {
    "/": {
      lang: "zh-CN",
      title: "rz文档",
      description: "rz文档",
    },
  },

  theme,

  plugins: [appendDatePlugin()],

  shouldPrefetch: false,

});
