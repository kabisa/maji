![Maji Mobile](img/maji-mobile-logo.png)

Maji Mobile is a mobile platform development solution, that allows you to quickly create mobile applications for any platform, using web technologies.
It allows any (Web-)developer to quickly start developing mobile applications for any mobile platform.

Maji Mobile is not a framework on itself; it generates a ready-to-go project that integrates several frameworks and custom scripts to allow building and running on mobile platforms. You can build Maji Mobile Apps for all mobile platforms and you can submit the apps to their respective Stores.

Whether you want to develop for iOS or Android, mobile or tablet, or any of the other mobile platforms, you can use Maji Mobile to develop applications for it.

Your Idea. Our Technology. For Everyone.

## Prerequisites

Before you can use Maji, make sure you have the following:

### Mac OS X

* [Homebrew](http://brew.sh) a Mac OS X package manager

### Linux

* [Nodejs](http://nodejs.org) allows Javascript to be run Server-side
* [Apache Ant](http://ant.apache.org) is used for building Java Applications
* [PhantomJS](http://phantomjs.org/download.html) is a headless WebKit Browser, scriptable with a JavaScript API

## Getting started

To create a new app execute the following commands in your shell:

```
$ npm install git+ssh://git@github.com:kabisaict/maji
$ ./node_modules/.bin/maji new org.example.my-app /desired/path/to/your/project/
$ cd /desired/path/to/your/project/
$ bin/setup
```

Your new Maji app will now be generated at the supplied path.
To start your app `cd` into its directory, execute `make watch` and navigate to http://localhost:9090/ with your browser.


  Usage: `maji [options] [command]`


  Commands:

    run [options] <platform>    build and run a native app for the specified platform
    build [options] <platform>  build a native app for the specified platform
    new <package_name> <path>   create a new Maji app

  Options:

    -h, --help     output usage information
    -V, --version  output the version number

## Frameworks

A Maji Mobile App comes with several frameworks built-in and configured to work together. It's these combinations of frameworks that makes a Maji Mobile App so easy to develop!

 * [Apache Cordova](https://cordova.apache.org) facilitates the translation from web technologies to mobile platforms.
 * [BackboneJS](http://backbonejs.org) our JavaScript MV* framework
 * [MarionetteJS](http://marionettejs.com) Marionette simplifies Backbone Views
 * [FastClick](http://ftlabs.github.io/fastclick/) disable the delay between click and the action on iOS
 * [jQuery](http://jquery.com) JavaScript library for working with the DOM
 * [Browserify](http://browserify.org) is a JavaScript module system that supports CommonJS syntax
 * [BugSnagJS](https://github.com/bugsnag/bugsnag-js) JavaScript client for [BugSnag](http://bugsnag.com/) exception tracker
 * [Karma](http://karma-runner.github.io/) is a JavaScript test runner
 * [MochaJS](http://mochajs.org) a JavaScript testing framework that supports a BDD style of writing tests
 * [Chai](http://chaijs.com) is an assertion library that enables a BDD style of developing

## Build-up

You can find the sources in the `src\` folder.
Compiled javascript is stored in `lib/`.  It is included in this repository so this module can be used straight from Github. Now an application using Maji doesn't have to to compile its sources to javascript first.

### Documentation

Here are some common links to documentation you might need
 * [Backbone](http://backbonejs.org)
 * [Marionette](http://marionettejs.com/docs/v1.8.7/)
 * [Mocha](http://mochajs.org/#assertions)
 * [Chai Expect/Should](http://chaijs.com/api/bdd/)
 * [Apache Cordova](http://cordova.apache.org/docs/en/4.0.0/)

There is also a [FAQ](docs/faq.md)
