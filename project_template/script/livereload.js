#!/usr/bin/env node

var tinylr = require('tiny-lr')
var gaze = require('gaze');

var lr = new tinylr.Server
lr.listen(35729, function (err) { if(err) { throw err } });

gaze('dist/**/*', function(err, watcher) {
 this.on('all', function() {
   console.log('Reloading browser...')
   lr.changed({body: {files: ['dummy']}})
 });
});
