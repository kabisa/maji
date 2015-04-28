#!/usr/bin/env node

var tinylr = require('tiny-lr');
var chokidar = require('chokidar');

var lr = new tinylr.Server
lr.listen(35729, function (err) { if(err) { throw err } });

var watcher = chokidar.watch(process.argv[2]);
watcher.on('ready', function(){
  watcher.on('all', function(event, path) {
    console.log('Reloading browser...')
    lr.changed({body: {files: [path]}})
  });
});
