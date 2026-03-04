import { defineConfig } from "vite";
import { viteStaticCopy } from "vite-plugin-static-copy";

export default defineConfig({
  base: "/curriculum-vitae/",
  plugins: [
    viteStaticCopy({
      targets: [
        {
          src: "data",
          dest: "",
        },
        {
          src: "i18n",
          dest: "",
        },
        {
          src: "documents",
          dest: "",
        },
        {
          src: "assets/face_1.jpg",
          dest: "assets",
        },
      ],
    }),
  ],
  build: {
    outDir: "dist",
    assetsDir: "assets",
    minify: "esbuild",
  },
});
