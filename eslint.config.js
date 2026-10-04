import js from "@eslint/js";
import { defineConfig, globalIgnores } from "eslint/config";
import globals from "globals";

const gameGlobals = {
  NI: {
    Engine: "readonly",
    API: "readonly",
  },
  SI: {
    g: "readonly",
    hero: "readonly",
    map: "readonly",
    addScrollbar: "readonly",
    removeScrollbar: "readonly",
  },
  common: {
    _g: "readonly",
    _t: "readonly",
    message: "readonly",
    log: "readonly",
    warn: "readonly",
    error: "readonly",
    CFG: "readonly",
  },
};

const buildGlobals = {
  INTERFACE: "readonly",
};

export default defineConfig([
  globalIgnores(["dist/"]),
  js.configs.recommended,
  {
    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.jquery,
        ...gameGlobals.SI,
        ...gameGlobals.NI,
        ...gameGlobals.common,
        ...buildGlobals,
      },
    },
  },
]);
