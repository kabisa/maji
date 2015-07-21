'use strict';

module.exports = function(karma) {
  karma.set({

    frameworks: [ 'mocha', 'sinon-chai', 'browserify', 'chai-jquery' ],

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

    browserify: {
      debug: true,
      extensions: [ '.coffee' ],
      transform: [ 'coffeeify' ]
    }
  });
};
