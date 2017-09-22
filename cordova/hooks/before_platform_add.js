const path = require("path");

function ensureDependencyInstalled(Q, projectRoot, mod) {
  try {
    const modulePath = path.join(
      projectRoot,
      "node_modules",
      mod,
      "package.json"
    );
    require(modulePath);
    return Q();
  } catch (e) {
    console.log(`Installing ${mod}`);
    const deferred = Q.defer();

    exec(`npm install ${mod}`, function(exitCode, stdout, stderr) {
      if (exitCode == 0) deferred.resolve();
      else deferred.reject();
    });

    return deferred.promise;
  }
}

module.exports = function(context) {
  if (context.opts.cordova.platforms.includes("ios")) {
    context.requireCordovaModule("shelljs/global");

    const projectRoot = context.opts.projectRoot;
    const Q = context.requireCordovaModule("q");
    return Q.all([
      ensureDependencyInstalled(Q, projectRoot, "ios-sim"),
      ensureDependencyInstalled(Q, projectRoot, "ios-deploy")
    ]);
  }
};
