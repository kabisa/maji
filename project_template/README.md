# ##APP_NAME##


## Getting started

* Make sure you have fulfilled the [prerequisites](#prerequisites)
* Running `bin/setup` will hook you up with everything you need

## Development workflow

* While developing you can run a local serve using `make watch`. This will start a server on http://localhost:9090.
* To create a static HTML5 app build run `make dist`. The app will be build into the `dist/` directory.
* To run the app on a connected mobile device run `bin/maji run <platform>`.
* To build a Cordova app run `bin/maji build <platform>`.
* To run Javascript tests run `bin/karma start`. This will start a Karma server with Phantomjs and will continuously watch your Javascript files and run tests on changes.
* To run features specs run `bundle exec rspec`.
* To run all tests run `bin/ci`.


## Packaging native apps / running on your device

* Make sure you have fulfilled the platform specific [prerequisites](#prerequisites) for the platform you're targeting.
* Running `bin/maji run` with the target platform as parameter, e.g. `bin/maji run ios` will launch the app on your connected iPhone, while `bin/maji run android` will launch the app on your connected Android device. Specifying `-e` on the `maji run` command will launch the app on the iOS Simulator or Android Emulator.


## Prerequisites

### General

* Ruby, for the Capybara integration specs
* NodeJS, for the build system (`bin/setup` will install this if you've got Homebrew)
* Homebrew (`bin/setup` will use this to hook you up with all of the dependencies, except Ruby)

### iOS

* XCode
* iOS SDK

### Android

* Android SDK
* Android platform tools installed
* Android platform 10+.
* Ant (`brew install ant`)
* `android` and `adb` in your $PATH (add `path/to/android-sdk-macosx/tools` and `path/to/android-sdk-macosx/platform-tools` to your $PATH).
