#!/usr/bin/env node
const spawn = require("child_process").spawn;
const path = require("path");
const maji_package = require("../package.json");

const parseBoolean = value => value === "true";
const parsePort = value => parseInt(value) || null;

const program = require("commander");
program.version(maji_package.version);

const runYarn = function(args, env_args = {}) {
  return runCmd("yarn", ["--silent", ...Array.from(args)], env_args);
};

const runCmd = function(cmd, args, env_args = {}) {
  let env = Object.create(process.env);
  Object.assign(env, env_args);

  let child = spawn(cmd, args, { env, stdio: "inherit" });

  if (child.stdout != null) {
    child.stdout.on("data", data => process.stdout.write(data));
  }

  if (child.stderr != null) {
    child.stderr.on("data", data => process.stderr.write(data.toString()));
  }

  return child.on("exit", exitCode => process.exit(exitCode));
};

const runScript = function(scriptName, args, env_args = {}) {
  return runCmd(
    path.resolve(__dirname + `/../script/${scriptName}`),
    args,
    env_args
  );
};

const literalArgs = function() {
  // commander.js program.args is broken for this purpose
  // https://github.com/tj/commander.js/issues/582
  if (program.rawArgs.indexOf("--") === -1) {
    return [];
  } else {
    return program.rawArgs.slice(program.rawArgs.indexOf("--") + 1);
  }
};

program
  .command("new <package_name> <path>")
  .description("Create a new Maji app")
  .on("--help", () =>
    console.log("  Example:\n  maji new org.example.my-app ~/Code/my-app")
  )
  .action(function(packageName, projectPath) {
    if (!packageName.match(/.*\..*\..*/)) {
      console.log(
        "Please specify a valid package name, for example org.example.my-app"
      );
      process.exit(1);
    }

    projectPath = path.resolve(projectPath);
    return runScript("create-project", [packageName, projectPath]);
  });

program
  .command("run <platform>")
  .description("Build and run a native app for the specified platform")
  .option("-e, --emulator", "run on emulator instead of an actual device")
  .option(
    "--env --environment [environment]",
    "NODE_ENV to run with [development]"
  )
  .action(function(platform, options) {
    const node_env =
      options.environment || process.env.NODE_ENV || "development";
    const env = {
      NODE_ENV: node_env
    };

    const deviceTypeArg = options.emulator ? "--emulator" : "--device";
    return runScript(
      "run-on-device",
      [platform, deviceTypeArg, ...Array.from(literalArgs())],
      env
    );
  });

program
  .command("build [platform]")
  .description("Build a native app for the specified platform")
  .option("--release", "create a release build")
  .option(
    "--env --environment [environment]",
    "NODE_ENV to build with [production]"
  )
  .action(function(platform, options) {
    const node_env = options.environment || "production";
    const env = {
      NODE_ENV: node_env
    };

    if (platform) {
      const releaseArg = options.release ? "--release" : "--debug";
      return runScript(
        "build-app",
        [platform, releaseArg, ...Array.from(literalArgs())],
        env
      );
    } else {
      return runYarn(["run", "build"], env);
    }
  });

program
  .command("test")
  .option("--watch", "Run tests when project files change")
  .option("--unit", "Run unit tests")
  .option("--integration", "Run integration tests")
  .description("Run your project tests")
  .action(function(options) {
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
    "Enable livereload [false]",
    parseBoolean,
    false
  )
  .action(function(options) {
    const env = {
      SERVER_PORT: options.port,
      LIVERELOAD: options.livereload
    };

    return runYarn(["start"], env);
  });

program.on("--help", () => process.exit(1));

program.on("*", function(action) {
  console.log(`Unknown command '${action}'`);
  return program.help();
});

program.parse(process.argv);
if (!process.argv.slice(2).length) {
  program.help();
}
