![Maji Mobile](img/maji-mobile-logo.png)

![Build Status](https://ci.kabisa.nl/buildStatus/icon?job=maji)

Maji Mobile is a mobile platform development solution, that allows you to quickly create mobile applications for any platform, using web technologies.
It allows any (Web-)developer to quickly start developing mobile applications for any mobile platform.

Maji Mobile is not a framework on itself; it generates a ready-to-go project that integrates several frameworks and custom scripts to allow building and running on mobile platforms. You can build Maji Mobile apps for all mobile platforms and you can submit the apps to their respective Stores.

Whether you want to develop for iOS or Android, mobile or tablet, or any of the other mobile platforms, you can use Maji Mobile to develop applications for it.

Your Idea. Our Technology. For Everyone.

## Prerequisites

Before you can use Maji, make sure you have the following:

* Node.js >= 6
* NPM
* Yarn
* Bash

Note that MacOS and Linux are best supported as development platform. Windows is supported in principle, but currently Maji has a hard dependency on Bash which is not ideal for Windows.

## Getting started

To create a new app, execute the following command in your shell:

```sh
bash <(curl -fsSL https://raw.githubusercontent.com/kabisa/maji/master/script/init.sh)
```

Your new Maji app will now be generated at the supplied path.

## Using Maji apps

### Starting in the browser

To start your app, `cd` into its directory, execute `bin/maji start` and navigate to http://localhost:9090/ with your browser.

### Running tests

To run test, you have several options:
* To run JavaScript tests, run `bin/maji test --watch`. This will start a Karma server with headless Chrome and will continuously watch your Javascript files and run tests on changes.
* To run JavaScript tests once, run `bin/maji test --unit`.
* To run features specs once, run `bin/maji test --integration`.
* To run all tests once, run `bin/maji test`.

### Creating builds

To build a static HTML5 app, run `bin/maji build`.

To build a native app, run `bin/maji build <platform>`.

## Frameworks and libraries

A Maji Mobile app comes with several frameworks and libraries built-in and configured to work together. It's this combination of frameworks that makes a Maji Mobile app so easy to develop.

 * [Apache Cordova](https://cordova.apache.org) facilitates the translation from web technologies to mobile platforms.
 * [Preact.js](https://preactjs.com) is our JavaScript view framework
 * [FastClick](http://ftlabs.github.io/fastclick/) disables the delay between a click and the corresponding action on older mobile devices
 * [Sentry](https://sentry.io) is used for exception tracking
 * [Webpack](https://webpack.js.org/) is a JavaScript module bundler
 * [Karma](http://karma-runner.github.io/) is a JavaScript test runner
 * [MochaJS](http://mochajs.org) is a JavaScript testing framework that supports a BDD style of writing tests
 * [Chai](http://chaijs.com) is an assertion library that enables a BDD style of developing
 * [I18n-js](https://github.com/fnando/i18n-js) is a library for internationalisation

## Browser support

Maji will work in evergreen browsers, IE10+, Android 4.4+ and iOS 8+. Maji's additional documentation offers [more details about browser support](docs/README.md#browser-support).

## FAQ

Maji's [frequently asked questions](docs/faq.md) are answered in the additional documentation.

## Documentation

Links to the documentation of Maji's components are available in the section about [frameworks and libraries](#frameworks-and-libraries) above.

More details are available in [Maji's additional documentation](docs/README.md).

## License

Maji Mobile is released under the [MIT License](LICENSE).
