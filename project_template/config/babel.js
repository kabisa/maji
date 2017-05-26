module.exports = {
  presets: [["es2015", { loose: true, modules: false }], ["stage-3"]],
  plugins: [["transform-react-jsx", { pragma: "h" }]]
};
