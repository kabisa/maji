#!/usr/bin/env node

const serverPort = process.env.SERVER_PORT || 9090;
const liveReload = process.env.LIVERELOAD === "true";

const express = require("express");
const webpack = require("webpack");
const devMiddleware = require("webpack-dev-middleware");
const hotMiddleware = require("webpack-hot-middleware");

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

if (liveReload) {
  // module hot reloading
  app.use(
    hotMiddleware(compiler, {
      publicPath: "/",
      noInfo: true
    })
  );
}

const server = app.listen(serverPort, function(err) {
  if (err) {
    console.error(err);
    return;
  }
  console.log(`Server listening on :${serverPort}`);
});

module.exports = server;
