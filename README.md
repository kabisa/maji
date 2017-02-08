![Maji Mobile](img/maji-mobile-logo.png)

![Build Status](https://ci.kabisa.nl/buildStatus/icon?job=maji/master)

Maji Mobile is a mobile platform development solution, that allows you to quickly create mobile applications for any platform, using web technologies.
It allows any (Web-)developer to quickly start developing mobile applications for any mobile platform.

Maji Mobile is not a framework on itself; it generates a ready-to-go project that integrates several frameworks and custom scripts to allow building and running on mobile platforms. You can build Maji Mobile Apps for all mobile platforms and you can submit the apps to their respective Stores.

Whether you want to develop for iOS or Android, mobile or tablet, or any of the other mobile platforms, you can use Maji Mobile to develop applications for it.

Your Idea. Our Technology. For Everyone.

## Prerequisites

Before you can use Maji, make sure you have the following:

### General

* Ruby + Bundler, for the integration specs
* Node.js >= 6 + NPM, for the build system

## Getting started

To create a new app execute the following commands in your shell:

```
$ npm install maji
$ ./node_modules/.bin/maji new org.example.my-app /desired/path/to/your/project/
$ cd /desired/path/to/your/project/
$ bin/setup
```

Your new Maji app will now be generated at the supplied path.

### bin/maji

  Usage: `bin/maji [options] [command]`


  Commands:

    new <package_name> <path>   Create a new Maji app
    run [options] <platform>    Build and run a native app for the specified platform
    build [options] [platform]  Build a native app for the specified platform
    test [options]              Run your project tests
    start [options]             Run the maji dev server and compile changes on the fly

  Options:

    -h, --help     output usage information
    -V, --version  output the version number

## Using Maji Apps

### Starting in the browser

To start your app, `cd` into its directory, execute `bin/maji start` and navigate to http://localhost:9090/ with your browser.

### Running tests

To run test, you have several options:
* To run JavaScript tests run `bin/maji test --watch`. This will start a Karma server with Phantomjs headless browser and will continuously watch your Javascript files and run tests on changes.
* To run JavaScript tests once, run `bin/maji test --unit`.
* To run features specs once, run `bin/maji test --integration`.
* To run all tests once, run `bin/maji test`.

### Creating builds

To build a static HTML5 app, run `make dist`.

To build a native app, run `bin/maji build <platform>`.

For CI docker files are included, which can be used incombination with the [kabisa jenkins-docker tooling](https://github.com/kabisa/jenkins-docker). `dockerfiles` includes files for tests only or build android packages.

## Developing Maji

When making changes to the Maji framework, you can test them by letting Node know you'll be using your local Maji version in a test app.

* Checkout Maji from Github
* Make changes in Maji
* Do a `npm link` in the Maji repo directory
* Create a new project so you can test changes to the framework: `node lib/cli.js new org.example.mytestapp /path/to/mytestapp`
* In the newly created project, link your local Maji: `npm link maji` and do a `bin/setup`
* Do a `bin/setup` every time you want to test the changes in your Maji code

## Build-up

You can find the sources in the `src/` folder.
Compiled javascript is stored in `lib/`.  It is included in this repository so this module can be used straight from Github. Now an application using Maji doesn't have to compile its sources to javascript first.

### Frameworks

A Maji Mobile App comes with several frameworks built-in and configured to work together. It's these combinations of frameworks that makes a Maji Mobile App so easy to develop!

 * [Apache Cordova](https://cordova.apache.org) facilitates the translation from web technologies to mobile platforms.
 * [BackboneJS](http://backbonejs.org) our JavaScript MV* framework
 * [MarionetteJS](http://marionettejs.com) Marionette simplifies Backbone Views
 * [FastClick](http://ftlabs.github.io/fastclick/) disable the delay between click and the action on iOS
 * [jQuery](http://jquery.com) JavaScript library for working with the DOM
 * [Webpack](https://webpack.js.org/) is a JavaScript module bundler
 * [BugSnagJS](https://github.com/bugsnag/bugsnag-js) JavaScript client for [BugSnag](http://bugsnag.com/) exception tracker
 * [Karma](http://karma-runner.github.io/) is a JavaScript test runner
 * [MochaJS](http://mochajs.org) a JavaScript testing framework that supports a BDD style of writing tests
 * [Chai](http://chaijs.com) is an assertion library that enables a BDD style of developing

### FAQ

For our Frequently Asked Questions, see [here](docs/faq.md).

### Documentation

Here are some links to documentation you might need:

 * [Backbone](http://backbonejs.org)
 * [Marionette](http://marionettejs.com/docs/v1.8.7/)
 * [Mocha](http://mochajs.org/#assertions)
 * [Chai Expect/Should](http://chaijs.com/api/bdd/)
 * [Apache Cordova](http://cordova.apache.org/docs/en/4.0.0/)


## License

Maji Mobile is released under the [MIT License](LICENSE).
