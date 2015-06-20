'use strict';

module.exports = function(karma) {
  karma.set({

    frameworks: [ 'mocha', 'sinon-chai', 'browserify' ],

    files: [
      { pattern: 'spec/spec_helper.coffee', watched: false, included: true, served: true },
      { pattern: 'spec/**/*spec.coffee', watched: false, included: true, served: true }
    ],

    preprocessors: {
      'spec/spec_helper.coffee': [ 'browserify' ],
      'spec/**/*spec.coffee': [ 'browserify' ]
    },

    client: {
      captureConsole: true,
      mocha: {
        reporter: 'html' // view on http://localhost:9876/debug.html
      }
    },

    reporters: ['mocha'],
    browsers: [ 'PhantomJS' ],

    // browserify configuration
    browserify: {
      debug: true,
      extensions: ['.hamlc', '.coffee'],
      transform: [ 'coffeeify', 'aliasify', 'yamlify', 'haml-coffee-browserify', ['envify', { _: 'purge' }], 'brfs' ]
    }
  });
};
