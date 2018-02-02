# <$= appName $>

## Getting started

* Make sure you have fulfilled the [prerequisites](#prerequisites)
* Running `bin/setup` will hook you up with everything you need

## Development workflow

* While developing you can run a local server using `bin/maji start`. This will start a server on http://localhost:9090.
* To create a static HTML5 app build, run `bin/maji build`. The app will be built into the `dist/` directory.
* To run the app on a connected mobile device, run `bin/maji run <platform>`.
* To build a Cordova app, run `bin/maji build <platform>`.
* To run Javascript tests, run `bin/maji test --watch`. This will start a Karma server with Phantomjs and will continuously watch your Javascript files and run tests on changes.
* To run integration specs, run `bin/maji test --integration`.
* To run all tests, run `bin/maji test`.

## Code formatting

Code is formatted by [Prettier](https://github.com/prettier/prettier).
The provided [Setup](#setup) script will install a git commit hook that will format your code.
Prettier can also be run manually using `yarn run prettier` or `yarn run prettier -- --write`.


## Packaging native apps / running on your device

* Make sure you have fulfilled the platform specific [prerequisites](#prerequisites) for the platform you're targeting.
* Running `bin/maji run` with the target platform as parameter, e.g. `bin/maji run ios` will launch the app on your connected iPhone, while `bin/maji run android` will launch the app on your connected Android device. Specifying `-e` on the `maji run` command will launch the app on the iOS Simulator or Android Emulator.

## Prerequisites

### General

* Node.js >=6 + NPM, for the build system
* Yarn >= 1, for package management
* Chrome v59.x or higher to run the tests headless
* Java 8 (or higher) to run the end-to-end tests (it powers the selenium server)

### iOS

* XCode
* iOS SDK

### Android

* Android SDK
* Android platform tools installed
* Android platform 10+.
* `android` and `adb` in your $PATH (add `path/to/android-sdk-macosx/tools` and `path/to/android-sdk-macosx/platform-tools` to your $PATH).
