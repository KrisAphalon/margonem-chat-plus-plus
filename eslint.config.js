import js from "@eslint/js";
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
  CURRENT_MAP_ID: "readonly",
  FILE_PREFIX: "readonly",
  AVAILABLE_MAP_FILES: "readonly",
};

export default [
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
];
