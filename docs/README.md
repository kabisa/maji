# Maji Mobile

* [What's in the box?](#inthebox)
* [FAQ](faq.md)


## <a name="inthebox"></a>What's in the box?

* Project setup
  * Intuitive directory structure, ready to go for Preact + Cordova development
  * Mobile page transitions integrated: 'slide', 'slideup' and 'flip'
  * I18n with autodetection of user locale, includes interpolation and pluralization. Uses YML files to define translations.
  * Cordova support
    * Network activity indication on iOS
    * Automatic iOS 7 + extended header
  * Per environment configurable settings (development, test, staging, production etc)
  * Fastclick.js integrated, removes default 300ms touch event delay
  * Raven-js is available to report exception to sentry.io, passing along build and contextual info
  * Setup script to bootstrap local development environments

* Fast Node.js based build system
  * Compilation of ES2015 and Sass
  * Javascript bundling and minification including source maps
  * CSS autoprefixer (no more vendor prefixes!)
  * Livereload integration. Make changes and your browser will automatically reload, works on mobile too.

* CLI tooling
  * Create new projects
  * Build Cordova apps
  * Run Cordova apps on connected mobile devices

* Testing support
  * Nightwatch.js for E2E integeration tests
  * Karma + Mocha + Chai for Javascript tests
  * SASS linting
  * Javascript formatting by Prettier
  * Commit hooks with style checks
  * CI script
