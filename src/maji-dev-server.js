#!/usr/bin/env node
var path     = require('path');
var express  = require('express');
var tinylr   = require('tiny-lr');
var chokidar = require('chokidar');
var program  = require('commander');

var parseBoolean = function(value) {
  return (value === 'true');
};

var parsePort = function(value) {
  return parseInt(value) || null;
};

program
  .usage('[options] <path>')
  .option('-p, --port [port]', 'Port to listen on [9090]', parsePort, 9090)
  .option('-l, --livereload [flag]', 'Enable livereload [true]', parseBoolean, true)
  .option('-c, --cors', 'Enable cors')
  .parse(process.argv);

var port = program.port;
var livereload = program.livereload;
var cors = program.cors;
var assetPath = program.args[0];

if (! assetPath) {
  program.outputHelp();
  process.exit(1);
}

var server = express();
var startFileWatcher = function() {
  var watcher = chokidar.watch(assetPath + '/**/*');
  watcher.on('ready', function(){
    console.log('Livereload enabled. Watching for changes in', assetPath);

    watcher.on('all', function(event, path) {
      tinylr.changed(path)
    });
  });
};

if(livereload) {
  server
    .use(tinylr.middleware({ app: server, dashboard: true }))
    .use(require('connect-livereload')({
      src: '/livereload.js?snipver=1',
      include: [ '/', '.*\.html']
    }));
}

if(cors) {
  server.use(function(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', req.get('Access-Control-Request-Headers') || '*');
    next();
  });
}

server
  .use(express.static(assetPath, {
    etag: false,
    lastModified: false
  }))
  .listen(port, function() {
    console.log('Server listening on', port);
    if(livereload) startFileWatcher();
  });
