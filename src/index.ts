import { definePlugin } from "@tempad-dev/plugins";
import transformToTailwind from "./transformToTailwind";

export default definePlugin({
  name: "Tailwind",
  code: {
    css: {
      title: "Tailwind", // Custom code block title
      lang: "css", // Custom syntax highlighting language
      transform({ code, options }) {
        return transformToTailwind(code, options?.useRem);
      },
    },
    js: false, // Hides the built-in JavaScript code block
  },
});
