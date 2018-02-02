#!/usr/bin/env node

const project_package = require("../project_template/package.json");
const [target, appName, majiVersion] = process.argv.slice(2);

project_package.name = appName;
project_package.dependencies["maji"] = majiVersion;

const content = JSON.stringify(project_package, null, 2);

const fs = require("fs");
fs.writeFile("" + target + "/package.json", content, function(err) {
  if (err) {
    process.exit(1);
  }
});
