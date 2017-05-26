module.exports = function(karma) {
  karma.set({
    frameworks: ["mocha", "chai", "chai-dom"],

    files: [
      { pattern: "src/**/!(cli).js", included: false },
			"spec/**/*.spec.js",
    ],

    preprocessors: {
      "src/**/!(cli).js": ["rollup"],
			"spec/**/*.spec.js": ["rollup"],
    },

    client: {
      captureConsole: true,
      mocha: {
        reporter: "html" // view on http://localhost:9876/debug.html
      }
    },

    reporters: ["mocha"],
    browsers: ["PhantomJS"],

    rollupPreprocessor: require("./rollup.config")
  });
};
