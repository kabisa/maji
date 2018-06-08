const supportedBrowsers = require("./supported-browsers");

module.exports = {
  presets: [
    ["@babel/stage-3"],
    [
      "@babel/env",
      {
        targets: {
          browsers: supportedBrowsers
        },
        modules: false,
        loose: true,
        useBuiltIns: "usage"
      }
    ]
  ],
  plugins: [["@babel/transform-react-jsx", { pragma: "h" }]]
};
