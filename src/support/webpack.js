import webpack from "webpack";
const MAJI_APP = /^MAJI_APP_/i;

const getEnvironmentVariables = function() {
  return Object.keys(process.env)
    .filter(key => MAJI_APP.test(key))
    .reduce((env, key) => {
      env[`process.env.${key}`] = JSON.stringify(process.env[key]);
      return env;
    }, {});
};

const getGitRevision = function() {
  const GitRevPlugin = require("git-revision-webpack-plugin");
  return new GitRevPlugin({
    commithashCommand: "rev-parse --short HEAD 2> /dev/null || echo untracked"
  }).commithash();
};

const getNpmVersion = function() {
  return require(`${process.cwd()}/package.json`).version;
};

const env = process.env.NODE_ENV || "development";

export const plugins = [
  new webpack.DefinePlugin(
    Object.assign({}, getEnvironmentVariables(), {
      "process.env.NODE_ENV": JSON.stringify(env),
      __BUILD_IDENTIFIER__: JSON.stringify(getGitRevision()),
      __VERSION_NUMBER__: JSON.stringify(getNpmVersion())
    })
  )
];
