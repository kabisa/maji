#!/usr/bin/env node

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

// module hot reloading
app.use(
  hotMiddleware(compiler, {
    publicPath: "/",
    noInfo: true
  })
);

const port = process.env.PORT || 9090;

const server = app.listen(port, function(err) {
  if (err) {
    console.error(err);
    return;
  }
  console.log(`Server listening on :${port}`);
});

module.exports = server;
