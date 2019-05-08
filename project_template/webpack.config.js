const path = require("path");
const webpack = require("webpack");
const babel = require("./config/babel");

const env = process.env.NODE_ENV || "development";
const useCordova = (process.env.USE_CORDOVA || "false") === "true";
const isProd = env === "production";
const hotReload = process.env.LIVERELOAD === "true" && !isProd;
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
  ...require("maji/lib/webpack").plugins,
  new HTML({
    template: "src/index.html",
    useCordova,
    inject: false,
    minify: false
  }),
  new Clean(["dist"], { verbose: false, exclude: [".keep"] }),
  extractShellCss,
  extractOtherCss,
  new SpriteLoaderPlugin()
];

const optimization = {
  splitChunks: isProd && { chunks: "all" },
  minimize: isProd,
  // prints more readable module names in the browser console on HMR updates, in dev
  namedModules: !isProd,
  // prevent emitting assets with errors, in dev
  noEmitOnErrors: !isProd
};

if (!isProd && hotReload) {
  plugins.push(
    // enable HMR globally
    new webpack.HotModuleReplacementPlugin()
  );
}
// end of plugin management

// optionally live-reloadable entry points
const entryPoints = function() {
  const items = hotReload
    ? ["webpack-hot-middleware/client?noInfo=true&reload=true"]
    : [];
  items.push(...arguments);
  return items;
};

const postcssLoader = {
  loader: "postcss-loader",
  options: {
    plugins: () => [require("autoprefixer")]
  }
};

/**
 * All of Maji's peerDependencies will be aliased to the versions
 * in this app's node_modules folder. This prevents building with
 * multiple versions of the same dependency.
 *
 * See: https://medium.com/@penx/managing-dependencies-in-a-node-package-so-that-they-are-compatible-with-npm-link-61befa5aaca7
 */
const majiAliases = (function() {
  const dependencies = require("maji/package.json").peerDependencies || {};
  return Object.keys(dependencies).reduce((aliases, packageName) => {
    aliases[packageName] = path.resolve(
      __dirname,
      `./node_modules/${packageName}`
    );
    return aliases;
  }, {});
})();

module.exports = {
  mode: isProd ? "production" : "development",
  entry: {
    app: entryPoints("./src/index.js")
  },
  output: {
    path: out,
    filename: "[name].[hash].js",
    publicPath: "./"
  },
  module: {
    rules: [
      {
        test: /.*/,
        include: path.resolve(__dirname, "src/assets"),
        exclude: path.resolve(__dirname, "src/assets/icons"),
        options: {
          name: "[name]-[hash].[ext]"
        },
        loader: "file-loader"
      },
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
              use: ["css-loader?modules", postcssLoader, "sass-loader"]
            })
          : [
              "style-loader",
              {
                loader: "css-loader",
                options: {
                  modules: true,
                  localIdentName: "[path][name]__[local]--[hash:base64:5]"
                }
              },
              postcssLoader,
              "sass-loader"
            ],
        exclude: /shell.scss$/
      },
      {
        test: /shell.scss$/,
        loader: isProd
          ? extractShellCss.extract({
              use: ["css-loader", postcssLoader, "sass-loader"]
            })
          : ["style-loader", "css-loader", postcssLoader, "sass-loader"]
      },
      {
        test: /\.svg$/,
        include: path.resolve(__dirname, "src/assets/icons"),
        loader: "svg-sprite-loader",
        options: {
          extract: true
        }
      }
    ]
  },
  resolve: {
    alias: Object.assign(
      {
        src: path.resolve(__dirname, "./src"),
        config: path.resolve(__dirname, "./config")
      },
      majiAliases
    ),
    symlinks: false
  },
  devtool: isProd ? "source-map" : "eval",
  plugins,
  optimization
};
