const supportedBrowsers = require("./supported-browsers");

module.exports = {
  presets: [
    [
      "@babel/env",
      {
        targets: {
          browsers: supportedBrowsers
        },
        modules: false,
        loose: true,
        useBuiltIns: "entry"
      }
    ]
  ],
  plugins: [
    ["@babel/transform-react-jsx", { pragma: "h" }],
    "@babel/plugin-syntax-dynamic-import",
    "@babel/plugin-syntax-import-meta",
    ["@babel/plugin-proposal-class-properties", { loose: false }],
    "@babel/plugin-proposal-json-strings"
  ]
};
