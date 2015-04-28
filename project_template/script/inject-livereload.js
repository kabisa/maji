var fs = require('fs');

var injectLiveReloadTag = function(html) {
  var livereloadScriptTag = "<script>document.write('<script src=\"http://'+(location.host || 'localhost').split(':')[0]+ ':35729/livereload.js?snipver=1\"></'+ 'script>')</script>";

  var bodyTagLocation = html.indexOf('</body>');

  if(bodyTagLocation != -1) {
    html = html.slice(0, bodyTagLocation) + livereloadScriptTag + html.slice(bodyTagLocation);
  }

  return html;
};

var file = process.argv[2];
var html = fs.readFileSync(file).toString();
fs.writeFileSync(file, injectLiveReloadTag(html));
