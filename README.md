# Maji Mobile

## About

![Maji Mobile](img/maji-mobile-logo.png)

Maji Mobile is a mobile platform development solution, that allows you to quickly create mobile applications for any platform, using web technologies.
It allows any (Web-)developer to quickly start developing mobile applications for any mobile platform.

Maji Mobile is not a framework on itself; it generates a ready-to-go project that utilises several frameworks and custom scripts to allow building and running on mobile platforms. You can build Maji Mobile Apps for all mobile platforms and you can submit the apps to their respective Stores.

Whether you want to develop for iOS or Android, mobile or tablet, or any of the other mobile platforms, you can use Maji Mobile to develop applications for it.

Your Idea. Our Technology. For Everyone.

## Getting started

To create a new app execute the following commands in your shell:

```
$ npm install git+ssh://git@github.com:kabisaict/maji
$ ./node_modules/.bin/maji new org.example.my-app /desired/path/to/your/project/
```

Your new Maji app will now be generated at the supplied path.
To start your app `cd` into it's directory, execute `make watch` and navigate to http://localhost:9090/ with your browser.

Find sources in `src/`. Compiled javascript is stored in `lib/` and included
in the repository so this module can be used straight from Github and without
needing the application using it to compile it's sources to javascript first.

### Usage

  Usage: `maji [options] [command]`


  Commands:

    run [options] <platform>    build and run a native app for the specified platform
    build [options] <platform>  build a native app for the specified platform
    new <package_name> <path>   create a new Maji app

  Options:

    -h, --help     output usage information
    -V, --version  output the version number

## Frameworks

 * ![Apacho Cordova](https://cordova.apache.org) facilitates the translation to from web technologies to mobile platforms.
 * ![BackboneJS](http://backbonejs.org)
 * ![MarionetteJS](http://marionettejs.com)
 * ![FastClick](http://ftlabs.github.io/fastclick/)
 * ![jQuery](http://jquery.com)
