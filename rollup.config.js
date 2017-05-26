const buble = require("rollup-plugin-buble");
const resolve = require("rollup-plugin-node-resolve");
const commonjs = require("rollup-plugin-commonjs");

module.exports = {
  entry: "src/main.js",
  format: "es",
  dest: "lib/bundle.js",
  plugins: [buble(), resolve(), commonjs()]
};
