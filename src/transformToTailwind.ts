import { toTailwindcss } from "transform-to-tailwindcss-core";

const transformToTailwind = (css: string, isRem?: boolean) => {
  return toTailwindcss(css, isRem);
};

export default transformToTailwind;
