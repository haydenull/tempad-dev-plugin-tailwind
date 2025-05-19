import { definePlugin } from "@tempad-dev/plugins";
import transformToTailwind from "./transformToTailwind";
import { version } from "../package.json";

console.log("tailwind plugin version", version);

export default definePlugin({
  name: "Tailwind",
  code: {
    css: {
      title: "Tailwind", // Custom code block title
      lang: "css", // Custom syntax highlighting language
      transform({ style, options }) {
        return transformToTailwind(style, options?.useRem);
      },
    },
    js: false, // Hides the built-in JavaScript code block
  },
});
