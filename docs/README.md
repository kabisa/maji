# Maji Mobile

* [Maji CLI](#maji-cli)
* [What's in the box?](#whats-in-the-box)
* [Browser support](#browser-support)
* [Components you might not need](#components-you-might-not-need)
* [FAQ](faq.md)

## Maji CLI

  Usage: `bin/maji [options] [command]`

  Commands:

    new <package_name> <path>     Create a new Maji app
    run [options] <platform>      Build and run a native app for the specified platform
    build [options] [<platform>]  Build a native app for the specified platform
    test [options]                Run your project's tests
    start [options]               Run the Maji dev server and compile changes on the fly

  Options:

    -h, --help     output usage information
    -V, --version  output the version number

## What's in the box?

* Project setup
  * Intuitive directory structure, ready to go for Preact + Cordova development
  * Mobile page transitions integrated: 'slide', 'slideup' and 'flip'
  * I18n with autodetection of user locale, includes interpolation and pluralization. Uses YML files to define translations.
  * Cordova support
    * Network activity indication on iOS
    * Automatic iOS 7+ extended header
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

## Browser support

Maji will work in evergreen browsers, IE10+, Android 4.4+ and iOS 8+. Minimal horizontal resolution is 320px.

Minimal support can be determined by which technologies Maji uses, and which front-end technologies you decide to use:

Preact:

* IE9+

Flexbox:

* IE10+
* Android 4.4+ (2.1 - 4.3 if you don't use `flex-wrap`)
* iOS 7.1+ (3.2 - 6.1 if you don't use `flex-wrap`)

CSS calc:

* IE9+
* iOS 6.1+
* Android 4.4+

SVG:

* IE9+
* Android 4.4+ (3+ if you don't use masking)
* iOS 3.2+

## Components you might not need

* [FastClick](https://github.com/ftlabs/fastclick) is only useful for older mobile devices, as described on GitHub.
