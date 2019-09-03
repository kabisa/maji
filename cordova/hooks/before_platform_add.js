require("shelljs/global");
const path = require("path");

function ensureDependencyInstalled(projectRoot, mod) {
  try {
    const modulePath = path.join(
      projectRoot,
      "node_modules",
      mod,
      "package.json"
    );
    require(modulePath);
    return Promise.resolve();
  } catch (e) {
    console.log(`Installing ${mod}`);
    return new Promise(function(resolve, reject) {
      exec(`npm install ${mod}`, function(exitCode) {
        if (exitCode == 0) resolve();
        else reject(e);
      });
    });
  }
}

module.exports = function(context) {
  if (context.opts.cordova.platforms.includes("ios")) {
    const projectRoot = context.opts.projectRoot;
    return Promise.all([
      ensureDependencyInstalled(projectRoot, "ios-sim"),
      ensureDependencyInstalled(projectRoot, "ios-deploy")
    ]);
  }
};
