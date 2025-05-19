import { defineConfig } from "tsup";
import { version } from "./package.json";

export default defineConfig({
  // entry: {
  //   [`index-v${version}`]: "src/index.ts",
  // },
  entry: ["src/index.ts"],
  splitting: false,
  clean: true,
  sourcemap: false,
  format: ["esm"],
  noExternal: [/.*/], // 使用正则表达式匹配所有依赖
  treeshake: true, // 开启 tree shaking 以优化包体积
  outDir: "dist",
});
