const spawn = require("cross-spawn");
const path = require("path");

module.exports.runCordova = (args, envArgs = {}) => {
  const cordovaCli = path.join(
    process.cwd(),
    "node_modules",
    ".bin",
    "cordova"
  );
  const cordovaDir = path.join(process.cwd(), "cordova");

  return runCmd(cordovaCli, args, envArgs, { cwd: cordovaDir });
};

module.exports.runYarn = (args, envArgs = {}) => {
  return runCmd("yarn", ["--silent", ...Array.from(args)], envArgs);
};

const runCmd = (cmd, args, envArgs = {}, spawnArgs = {}) => {
  if (process.env.TRACE) {
    console.log(
      `Executing ${cmd} (${args}) (${JSON.stringify(
        envArgs
      )}) (${JSON.stringify(spawnArgs)})`
    );
  }

  return new Promise((resolve, reject) => {
    let env = Object.create(process.env);
    Object.assign(env, envArgs);

    let child = spawn(cmd, args, { env, stdio: "inherit", ...spawnArgs });

    if (child.stdout != null) {
      child.stdout.on("data", data => process.stdout.write(data));
    }

    if (child.stderr != null) {
      child.stderr.on("data", data => process.stderr.write(data.toString()));
    }

    child.on("exit", exitCode => {
      if (exitCode == 0) resolve();
      else reject(exitCode);
    });
  });
};
