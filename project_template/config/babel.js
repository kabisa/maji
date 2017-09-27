const supportedBrowsers = require("./supported-browsers");

module.exports = {
  presets: [
    ["stage-3"],
    [
      "env",
      {
        targets: {
          browsers: supportedBrowsers
        },
        modules: false,
        loose: true,
        useBuiltIns: true
      }
    ]
  ],
  plugins: [["transform-react-jsx", { pragma: "h" }]]
};
