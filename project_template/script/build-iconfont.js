var path        = require('path');
var iconfont    = require('gulp-iconfont'),
    iconfontCss = require('gulp-iconfont-css');
var fs          = require('vinyl-fs');

// Gulp-icon-font-css has some weird path handling.
// targetPath needs to be a relative path from the outputPath.
var outputPath = process.env.DIST_DIR + '/assets/fonts/';
var targetPath = path.relative(
  outputPath,
  __dirname + '/../app/styles/fonts/'
);

fs.src('app/styles/icons/*.svg', { base: 'app/styles' })
  .pipe(iconfontCss({
    fontName: 'icons',
    path: 'config/iconfont.scss.js',
    targetPath: targetPath + '/_icons.scss',
    fontPath: 'fonts/',
  }))
  .pipe(iconfont({
    fontName: 'icons',
    log: function() {}
   }))
  .pipe(fs.dest(outputPath));
