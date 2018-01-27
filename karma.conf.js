module.exports = function(karma) {
  karma.set({
    frameworks: ["mocha", "chai", "chai-dom", "sinon-chai"],

    files: [
      { pattern: "src/**/!(cli).js", included: false },
      "spec/**/*.spec.js"
    ],

    preprocessors: {
      "src/**/!(cli).js": ["rollup"],
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

    rollupPreprocessor: Object.assign({}, require("./rollup.config"), {
      external: undefined
    })
  });
};
