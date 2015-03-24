'use strict';

module.exports = function(karma) {
  karma.set({

    frameworks: [ 'mocha', 'chai', 'browserify' ],

    files: [
      'spec/spec_helper.coffee', 'spec/**/*spec.coffee'
    ],

    preprocessors: {
      'spec/spec_helper.coffee': [ 'browserify' ],
      'spec/**/*spec.coffee': [ 'browserify' ]
    },

    client: {
      mocha: {
        reporter: 'html' // view on http://localhost:9876/debug.html
      }
    },

    reporters: ['mocha'],
    browsers: [ 'PhantomJS' ],

    // browserify configuration
    browserify: {
      debug: true,
      bundleDelay: 1000, // to prevent double runs when watching, see https://github.com/nikku/karma-browserify/issues/67
      extensions: ['.hamlc', '.coffee'],
      transform: [ 'coffeeify', 'yamlify', 'haml-coffee-browserify', ['envify', { _: 'purge' }], 'brfs' ]
    }
  });
};
