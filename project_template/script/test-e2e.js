#!/usr/bin/env node

const spawn = require("child_process").spawn;
const server = require("./dev-server.js");

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
