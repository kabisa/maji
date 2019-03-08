const { runYarn, runCordova } = require("./utils");

/**
 * @param {string} environment - NODE_ENV environment.
 * @param {string} platform - platform to build for. One of `android`, `ios`. If
 * no platform is provided, no Cordova build will be performed only web assets will
 * be built.
 * @param {string} mode - build mode. One of `release`, `debug`. Only applicable
 * if `platform` is provided.
 *
 * @returns Promise - resolves when build succeeds, rejects if build fails.
 */
module.exports.build = (environment, platform, mode, restArgs) => {
  const env = {
    NODE_ENV: environment,
    USE_CORDOVA: !!platform
  };

  const buildNative = () =>
    platform
      ? buildCordovaApp(platform, mode, env, restArgs)
      : Promise.resolve();

  return buildAssets(env).then(buildNative);
};

/**
 * @param {string} environment - NODE_ENV environment.
 * @param {string} platform - platform to build for. One of `android`, `ios`.
 * @param {string} deviceOpts - device type to run on. One of `emulator`, `device`.
 * @param {string[]} restArgs - literal rest command line arguments to pass to Cordova.
 *
 * @returns Promise - resolves when run succeeds, rejects if run fails.
 */
module.exports.run = (environment, platform, deviceType, restArgs) => {
  const env = {
    NODE_ENV: environment,
    USE_CORDOVA: true
  };
  const deviceOpts = process.env.DEVICE_OPTS ? [process.env.DEVICE_OPTS] : [];

  const cordovaRun = () =>
    runCordova(
      ["run", platform, `--${deviceType}`, ...restArgs, ...deviceOpts],
      env
    );

  return buildAssets(env)
    .then(() => cordovaPrepare(platform, env))
    .then(cordovaRun);
};

const buildAssets = env => runYarn(["run", "build"], env);

const cordovaPrepare = (platform, env) =>
  runCordova(["prepare", platform], env);

const buildCordovaApp = (platform, mode, env, restArgs) => {
  const buildCordova = () =>
    runCordova(["build", platform, `--${mode}`, ...restArgs], env);

  return cordovaPrepare(platform, env).then(buildCordova);
};
