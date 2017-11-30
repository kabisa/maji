const buble = require("rollup-plugin-buble");
const resolve = require("rollup-plugin-node-resolve");
const commonjs = require("rollup-plugin-commonjs");
const replace = require("rollup-plugin-replace");

const replaceNodeEnv = () =>
  replace({
    "process.env.NODE_ENV": JSON.stringify(process.env.NODE_ENV || "test")
  });

module.exports = {
  entry: "src/main.js",
  format: "es",
  dest: "lib/bundle.js",
  external: ["preact"],
  plugins: [buble({ jsx: "h" }), resolve(), commonjs(), replaceNodeEnv()]
};
