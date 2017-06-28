const path = require("path");
const webpack = require("webpack");
const babel = require("./config/babel");
const uglify = require("./config/uglify");

const env = process.env.NODE_ENV || process.env.APP_ENV || "development";
const isProd = env === "production";
const out = path.resolve(__dirname, "dist");
const exclusions = /node_modules/;

const ExtractText = require("extract-text-webpack-plugin");
const extractShellCss = new ExtractText("shell.[hash].css");
const extractOtherCss = new ExtractText("styles.[hash].css");

process.stderr.write(`Building with env = ${env}\n`);

// plugin management
const HTML = require("html-webpack-plugin");
const Clean = require("clean-webpack-plugin");
const SpriteLoaderPlugin = require("svg-sprite-loader/plugin");
const plugins = [
  new HTML({
    template: "src/index.html",
    inject: false,
    minify: false
  }),
  new Clean(["dist"]),
  new webpack.optimize.CommonsChunkPlugin({
    name: "vendor"
  }),
  new webpack.DefinePlugin({
    "process.env.NODE_ENV": JSON.stringify(env)
  }),
  extractShellCss,
  extractOtherCss,
  new SpriteLoaderPlugin()
];

if (isProd) {
  plugins.push(
    new webpack.LoaderOptionsPlugin({ minimize: true, debug: false }),
    new webpack.optimize.UglifyJsPlugin(uglify)
  );
} else {
  plugins.push(
    // enable HMR globally
    new webpack.HotModuleReplacementPlugin(),
    // prints more readable module names in the browser console on HMR updates
    new webpack.NamedModulesPlugin(),
    // prevent emitting assets with errors
    new webpack.NoEmitOnErrorsPlugin()
  );
}
// end of plugin management

// optionally live-reloadable entry points
const entryPoints = function() {
  const items = isProd
    ? []
    : ["webpack-hot-middleware/client?noInfo=true&reload=true"];
  items.push(...arguments);
  return items;
};

module.exports = {
  entry: {
    app: entryPoints("./src/index.js"),
    vendor: ["preact", "preact-router"]
  },
  output: {
    path: out,
    filename: "[name].[hash].js",
    publicPath: "./"
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: exclusions,
        loader: "babel-loader",
        options: babel
      },
      { test: /\.yml$/, loader: "json-loader!yaml-loader" },
      {
        test: /\.scss$/,
        loader: isProd
          ? extractOtherCss.extract({
              use: "css-loader?modules!postcss-loader!sass-loader"
            })
          : [
              { loader: "style-loader" },
              {
                loader: "css-loader",
                options: {
                  modules: true,
                  localIdentName: "[path][name]__[local]--[hash:base64:5]"
                }
              },
              { loader: "postcss-loader" },
              { loader: "sass-loader" }
            ],
        exclude: /shell.scss$/
      },
      {
        test: /shell.scss$/,
        loader: isProd
          ? extractShellCss.extract({
              use: "css-loader!postcss-loader!sass-loader"
            })
          : "style-loader!css-loader!postcss-loader!sass-loader"
      },
      {
        test: /\.svg$/,
        loader: "svg-sprite-loader",
        options: {
          extract: true
        }
      }
    ]
  },
  resolve: {
    alias: {
      src: path.resolve(__dirname, "./src"),
      config: path.resolve(__dirname, "./config")
    },
    symlinks: false
  },
  devtool: isProd ? "source-map" : "eval",
  plugins
};
