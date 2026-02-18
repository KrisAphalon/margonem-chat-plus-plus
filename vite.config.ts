import fs from "node:fs";
import process from "node:process";
import { defineConfig, loadEnv } from "vite";
import cssInjectedByJsPlugin from "vite-plugin-css-injected-by-js";

function getVersion() {
  let version;
  try {
    const versionFile = fs.readFileSync("version");
    version = versionFile.toString().trim();
  } catch {
    version = "local";
  }

  return version;
}

function getEnv(mode: string) {
  const env = loadEnv(mode, process.cwd(), "");
  const INTERFACE = env["INTERFACE"];
  if (!INTERFACE) {
    throw new Error(`INTERFACE env variable is required`);
  }
  return {
    INTERFACE,
  };
}

export default defineConfig(({ mode }) => {
  const env = getEnv(mode);

  const gameInterface = env["INTERFACE"] || "NI";

  return {
    build: {
      emptyOutDir: false,
      outDir: "dist",
      minify: "terser",
      terserOptions: {
        ecma: 2020,
        compress: {
          passes: 4,
        },
      },
      lib: {
        entry: "src/main.js",
        name: "main",
        fileName: () =>
          gameInterface === "NI"
            ? "chat-plus-plus-NI.js"
            : "chat-plus-plus-SI.js",
        formats: ["iife"],
      },
      rollupOptions: {
        treeshake: "smallest",
      },
    },
    define: {
      INTERFACE: JSON.stringify(gameInterface),
      VERSION: JSON.stringify(getVersion()),
    },
    css: {
      preprocessorOptions: {
        scss: {
          quietDeps: true,
          additionalData: `$INTERFACE: "${gameInterface}";`,
        },
      },
    },
    plugins: [cssInjectedByJsPlugin()],
  };
});
