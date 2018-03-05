#!/usr/bin/env node
const maji_package = require("../package.json");
const tasks = require("./tasks");
const { runYarn, runCordova } = require("./utils");

const parseBoolean = value => value === "true";
const parsePort = value => parseInt(value) || null;

const program = require("commander");
program.version(maji_package.version);

const exit = code => process.exit(parseInt(code) || 1);

const literalArgs = () => {
  // commander.js program.args is broken for this purpose
  // https://github.com/tj/commander.js/issues/582
  if (program.rawArgs.indexOf("--") === -1) {
    return [];
  } else {
    return program.rawArgs.slice(program.rawArgs.indexOf("--") + 1);
  }
};

program
  .command("new")
  .description("Create a new Maji app")
  .action(() => {
    console.error(
      "Maji new has been removed. Use `yarn create maji-app` to create a new app."
    );
    process.exit(1);
  });

program
  .command("run <platform>")
  .description("Build and run a native app for the specified platform")
  .option("-e, --emulator", "run on emulator instead of an actual device")
  .option(
    "--env --environment [environment]",
    "NODE_ENV to run with [development]"
  )
  .action((platform, options) => {
    const environment =
      options.environment || process.env.NODE_ENV || "development";
    const deviceType = options.emulator ? "emulator" : "device";

    tasks.run(environment, platform, deviceType, literalArgs()).catch(exit);
  });

program
  .command("build [platform]")
  .description("Build a native app for the specified platform")
  .option("--release", "create a release build")
  .option(
    "--env --environment [environment]",
    "NODE_ENV to build with [production]"
  )
  .action((platform, options) => {
    const environment =
      options.environment || process.env.NODE_ENV || "production";
    const mode = options.release ? "release" : "debug";

    tasks.build(environment, platform, mode).catch(exit);
  });

program
  .command("test")
  .option("--watch", "Run tests when project files change")
  .option("--unit", "Run unit tests")
  .option("--integration", "Run integration tests")
  .description("Run your project tests")
  .action(options => {
    if (options.watch) {
      return runYarn(["run", "test:watch"]);
    }

    if (options.unit) {
      return runYarn(["run", "test:unit"]);
    }

    if (options.integration) {
      return runYarn(["run", "test:e2e"]);
    }

    return runYarn(["test"]);
  });

program
  .command("start")
  .description("Run the maji dev server and compile changes on the fly")
  .option("-p --port [port]", "Port to listen on [9090]", parsePort, 9090)
  .option(
    "-l --livereload [flag]",
    "Enable livereload [true]",
    parseBoolean,
    true
  )
  .action(options => {
    const env = {
      SERVER_PORT: options.port,
      LIVERELOAD: options.livereload
    };

    return runYarn(["start"], env);
  });

program.on("--help", () => process.exit(1));

program.on("*", action => {
  console.log(`Unknown command '${action}'`);
  return program.help();
});

program.parse(process.argv);
if (!process.argv.slice(2).length) {
  program.help();
}
