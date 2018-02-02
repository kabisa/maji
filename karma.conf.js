module.exports = function(karma) {
  const rollupConfig = require("./rollup.config")[0];

  karma.set({
    frameworks: ["mocha", "chai", "chai-dom", "sinon-chai"],

    files: [
      { pattern: "src/**/!(cli|webpack).js", included: false },
      "spec/**/*.spec.js"
    ],

    preprocessors: {
      "src/**/!(cli|tasks|utils).js": ["rollup"],
      "spec/**/*.spec.js": ["rollup"]
    },

    client: {
      captureConsole: true,
      mocha: {
        reporter: "html" // view on http://localhost:9876/debug.html
      }
    },

    reporters: ["mocha"],
    browsers: ["ChromeHeadlessNoSandbox"],
    customLaunchers: {
      ChromeHeadlessNoSandbox: {
        base: "ChromeHeadless",
        flags: ["--no-sandbox"]
      }
    },

    rollupPreprocessor: {
      output: rollupConfig.output,
      plugins: rollupConfig.plugins,
      external: undefined
    }
  });
};
