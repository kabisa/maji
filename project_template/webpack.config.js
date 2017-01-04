const path          = require('path');
const webpack       = require('webpack');

const APP_ENV       = process.env.APP_ENV || 'development';
const IS_PROD_BUILD = ! ["development", "test"].includes(APP_ENV);

const plugins = [
  new webpack.DefinePlugin({
    'process.env':{
      'APP_ENV': JSON.stringify(APP_ENV),
    }
  })
];

if(IS_PROD_BUILD) plugins.push(new webpack.optimize.UglifyJsPlugin({minimize: true}));

module.exports = {
  entry: './app/application.coffee',
  output: {
    path: path.resolve(__dirname, 'dist/assets'),
    filename: 'app.js'
  },
  module: {
    rules: [
      { test: /\.coffee$/, loader: 'coffee-loader' },
      { test: /\.hamlc$/, loader: 'transform-loader?haml-coffee-browserify' },
      { test: /\.json$/, loader: 'json-loader' },
      { test: /\.yml$/, loader: 'json-loader!yaml-loader' },
    ]
  },
  resolve: {
    extensions: ['.js', '.coffee', '.hamlc'],
    alias: {
      'app': path.resolve(__dirname, 'app/')
    }
  },
  node: {
    process: false
  },
  plugins: plugins,
  performance: {
    hints: false
  }
}
