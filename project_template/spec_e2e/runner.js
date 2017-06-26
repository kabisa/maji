const spawn = require("cross-spawn");
const express = require("express");
const webpack = require("webpack");
const devMiddleware = require("webpack-dev-middleware");

const config = require("../webpack.config.js");
const compiler = webpack(config);
const app = express();

// serve output from webpack
app.use(
  devMiddleware(compiler, {
    publicPath: "/",
    stats: {
      colors: true,
      chunks: false
    }
  })
);

const server = app.listen(process.env.port || 9091, function(err) {
  if (err) {
    console.log(err);
    return;
  }
  console.log("Server ready...");
});

const testRunner = spawn(
  "./node_modules/.bin/nightwatch",
  ["-c", "config/nightwatch.js"],
  { stdio: "inherit", env: process.env }
);

testRunner.on("exit", function(code) {
  server.close();
  process.exit(code);
});

testRunner.on("error", function(err) {
  server.close();
  throw err;
});
