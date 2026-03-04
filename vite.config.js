import { defineConfig } from "vite";
import { viteStaticCopy } from "vite-plugin-static-copy";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = fileURLToPath(new URL(".", import.meta.url));

function watchStaticJson() {
  return {
    name: "watch-static-json",
    configureServer(server) {
      const dirs = ["data", "i18n"].map((d) => path.resolve(__dirname, d));
      server.watcher.add(dirs);
      server.watcher.on("change", (file) => {
        if (dirs.some((d) => file.startsWith(d))) {
          server.ws.send({ type: "full-reload" });
        }
      });
    },
  };
}

export default defineConfig({
  base: "/curriculum-vitae/",
  plugins: [
    watchStaticJson(),
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
