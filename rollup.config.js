import buble from "rollup-plugin-buble";

export default {
  entry: "src/main.js",
  format: "es",
  dest: "lib/bundle.js",
  plugins: [ buble() ]
}
