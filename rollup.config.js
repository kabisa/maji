const buble = require("rollup-plugin-buble");
const resolve = require("rollup-plugin-node-resolve");
const commonjs = require("rollup-plugin-commonjs");
const replace = require("rollup-plugin-replace");

const replaceNodeEnv = () =>
  replace({
    "process.env.NODE_ENV": JSON.stringify(process.env.NODE_ENV || "test")
  });

export default [
  {
    input: "src/main.js",
    output: {
      file: "lib/bundle.js",
      format: "es"
    },
    external: ["preact", "preact-router"],
    plugins: [buble({ jsx: "h" }), resolve(), commonjs(), replaceNodeEnv()]
  },
  {
    input: "src/support/webpack.js",
    output: {
      file: "lib/webpack.js",
      format: "cjs"
    },
    external: ["webpack"],
    plugins: [resolve()]
  }
];
