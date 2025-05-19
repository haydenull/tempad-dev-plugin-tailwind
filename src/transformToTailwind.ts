import { toTailwindcss } from "transform-to-tailwindcss-core";

const transformToTailwind = (
  style: Record<string, string>,
  isRem?: boolean
) => {
  return Object.entries(style)
    .map(
      ([key, value]) =>
        `${key}: ${value
          .replace(/\/\*.*\*\//g, "")
          .replace(/var\(--[\w-]*,\s*(.*)\)/g, (_, $1) => $1)
          .trim()}`
    )
    .map((str) => toTailwindcss(str, isRem))
    .join(" ");
};

export default transformToTailwind;
