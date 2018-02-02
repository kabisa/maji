#!/usr/bin/env node

const child_process = require("child_process");

const hasJava = function() {
  return child_process.spawnSync("java", ["-version"]).status == 0;
};

// workaround for issue https://github.com/nightwatchjs/nightwatch/issues/1454
// prevents false positives.
// Can be skipped if selenium server is disabled in nightwatch
if (!hasJava()) {
  const colorRed = "\x1b[31m";
  const colorReset = "\x1b[0m";
  console.error(`${colorRed}JAVA not found. Exiting${colorReset}`);
  process.exit(1);
}

const server = require("./dev-server.js");

const testOptions = process.argv.slice(2);
const testRunner = child_process.spawn(
  "./node_modules/.bin/nightwatch",
  ["-c", "config/nightwatch.js", ...testOptions],
  { stdio: "inherit", env: process.env }
);

testRunner.on("exit", function(code) {
  server.close();
  process.exit(code);
});

testRunner.on("error", function(err) {
  console.error(err);
  server.close();
  process.exit(1);
});
