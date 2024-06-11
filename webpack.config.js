import * as childProcess from "child_process";
import * as fs from "fs";
import * as path from "path";
import * as sass from "sass";
import webpack from "webpack";

const inputScss = fs.readFileSync("res/style.scss").toString();
const resultSI = sass.compileString('$INTERFACE: "SI";\n\n' + inputScss, {
  style: "compressed",
}).css;

const resultNI = sass.compileString('$INTERFACE: "NI";\n\n' + inputScss, {
  style: "compressed",
}).css;

const version = childProcess
  .execSync("cat version")
  .toString()
  .replace("\n", "");

const CONSTANTS = new webpack.DefinePlugin({
  FILE_PREFIX: JSON.stringify(
    "https://cdn.jsdelivr.net/gh/KrisAphalon/margonem-chat-plus-plus@" +
      version +
      "/",
  ),
  VERSION: JSON.stringify(version),
});

const rules = [
  {
    test: /\.m?js$/,
    exclude: /(node_modules|bower_components)/,
    use: {
      loader: "babel-loader",
      options: {
        presets: ["@babel/preset-env"],
        plugins: [
          "@babel/plugin-transform-runtime",
          "babel-plugin-remove-template-literals-whitespace",
        ],
        minified: true,
      },
    },
  },
];

function createBuild(name, mode, gameInterface, css) {
  return {
    name: name,
    mode: mode,
    entry: "./src/main.js",
    output: {
      path: path.resolve(import.meta.dirname, "dist/"),
      filename: `chat-plus-plus-${gameInterface}.js`,
    },
    plugins: [
      CONSTANTS,
      new webpack.DefinePlugin({
        INTERFACE: JSON.stringify(gameInterface),
        BASIC_CSS: JSON.stringify(css),
      }),
    ],
    module: {
      rules,
    },
  };
}

const buildNI = createBuild("NI", "production", "NI", resultNI);
const buildSI = createBuild("SI", "production", "SI", resultSI);

export default [buildNI, buildSI];
// module.exports = [
//
// ]
