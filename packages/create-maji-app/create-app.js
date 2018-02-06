#!/usr/bin/env node

const yargs = require("yargs");
const { createEnv } = require("yeoman-environment");
const { resolve, basename } = require("path");

const env = createEnv();
const done = exitCode => process.exit(exitCode || 0);
const appGenerator = resolve(__dirname);
env.register(require.resolve(appGenerator), "create-app");

const cli = yargs
  .command("<package> <app-directory>")
  .demandCommand(2)
  .help()
  .wrap(null).argv;

const package = cli._[0];

if (!package.match(/.*\..*\..*/)) {
  console.log(
    "Please specify a valid package name, for example org.example.my-app"
  );
  process.exit(1);
}

const directory = resolve(cli._[1]);

env.run(
  "create-app",
  {
    package,
    directory
  },
  done
);
