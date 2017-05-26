function ensureDependencyInstalled(Q, mod) {
  try {
    require(`${mod}/package.json`);
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

    var Q = context.requireCordovaModule("q");
    return Q.all([
      ensureDependencyInstalled(Q, "ios-sim"),
      ensureDependencyInstalled(Q, "ios-deploy")
    ]);
  }
};
