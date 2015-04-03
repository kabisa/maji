# Maji Mobile

* [What's in the box?](#inthebox)
* [FAQ](faq.md)


## <a name="inthebox"></a>What's in the box?

* Project setup
  * Intuitive directory structure, ready to go for Backbone + Marionette development
  * Mobile page transitions integrated
  * I18n with autodetection of user locale, includes interpolation and pluralization. Uses YML files to define translations.
  * Haml Coffee templates with I18n and other template helpers integrated
  * Cordova support
    * Publishes Cordova events on the application event bus
    * Network activity indication on iOS
    * Automatic iOS 7 + extended header
  * Bugsnag Javascript error tracking integrated
  * Per environment configurable settings (development, test, staging, production etc)
  * Fastclick.js integrated, removes default 300ms touch event delay
  * Setup script to bootstrap local development environments

* Fast Node based build system
  * Compilation of Coffeescript and Sass
  * Javascript bundling and minification including source maps
  * CommonJS module system using Browserify
  * CSS autoprefixer (no more vendor prefixes!)
  * Iconfont builder. Drop an SVG in your project and it's instantly available in your iconfont. [Read more](./icons.md).
  * Livereload integration. Make changes and your browser will automatically reload, works on mobile too.

* CLI tooling
  * Create new projects
  * Build Cordova apps
  * Run Cordova apps on connected mobile devices

* Testing support
  * Rspec + Capybara for feature specs
  * Karma + Mocha + Chai for Javascript tests
  * SASS linting
  * Coffeescript linting
  * Commit hooks for linting
  * CI script + CI Dockerfile
