'use strict';

module.exports = function(karma) {
  karma.set({

    frameworks: [ 'mocha', 'sinon-chai' ],

    files: [
      'spec/spec_index.coffee'
    ],

    preprocessors: {
      'spec/spec_index.coffee': ['webpack']
    },

    client: {
      captureConsole: true,
      mocha: {
        reporter: 'html' // view on http://localhost:9876/debug.html
      }
    },

    reporters: ['mocha'],
    browsers: [ 'PhantomJS' ],

    webpack: require('./webpack.config.js'),
    webpackMiddleware: {
      stats: 'errors-only'
    }
  });
};
