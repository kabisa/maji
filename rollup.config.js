import buble from "rollup-plugin-buble";
import resolve from "rollup-plugin-node-resolve";
import commonjs from "rollup-plugin-commonjs";

export default {
  entry: "src/main.js",
  format: "es",
  dest: "lib/bundle.js",
  plugins: [ buble(), resolve(), commonjs() ]
}
