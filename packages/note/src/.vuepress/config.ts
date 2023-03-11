import { defineUserConfig } from "@vuepress/cli";
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

  shouldPrefetch: false,
});
