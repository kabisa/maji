# Change Log
All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](http://keepachangelog.com/)
and this project adheres to [Semantic Versioning](http://semver.org/).

## [Unreleased]
### Added
- Settings can be extended with default, env agnostic, settings. [#176](https://github.com/kabisa/maji/pull/176)
- Environment variables starting with `MAJI_APP_` are injected by default. They can be referenced by `process.env.MAJI_APP_*` in your code. [#190](https://github.com/kabisa/maji/pull/190)

### Changed
- Made cosmetic changes to the documentation.

## 3.0.2
### Fixed
- Maji CLI comptability with Yarn 1.x. [#174](https://github.com/kabisa/maji/pull/174)

## 3.0.0
### Changed
- The default Javascript stack is now ES2015+, Preact and Redux

### Removed
- Support for Backbone, Marionette, jQuery
- Support for `APP_ENV`, in favor of `NODE_ENV`
- `Makefile` for build and deploy, in favor of `package.json` tasks
- Rspec/capybara for integration tests, in favor of Nightwatch.js

## [2.0.2] - 2017-02-21
### Fixed
- Fixed issue where default --env value overrides APP_ENV env var [#148](https://github.com/kabisa/maji/pull/148)

## [2.0.0] - 2017-02-06
### Added
- memo-is for using memoization in specs
- Improved Maji CLI. Adds `maji test` and `maji start` commands. [#138](https://github.com/kabisa/maji/pull/138/)
- Incremental build support. Requires updated Makefile that ships with Maji 2 projects. [#131](https://github.com/kabisa/maji/pull/131)

### Changed

- Updated Marionette to 3.1
- Updated Backbone to 1.3.3
- Updated Mocha to 3.1.2
- Updated jQuery to 3.0.0
- Node.js >= 6 is now required
- Switched from Browserify to webpack module bundler
- `maji run` and `maji build` CLI command now allow passing raw arguments to Cordova CLI. [#137](https://github.com/kabisa/maji/pull/137])

### Removed

- Maji plugin management (`cordova/plugins.txt`) in favor of Cordova plugin management
- Maji application bus in favor of Backbone.Radio
- Maji Cordova platform management, see upgrade guide for details
- Dependency installation via Homebrew. [#119](https://github.com/kabisa/maji/pull/119)

### Upgrading

Please refer to the [upgrade guide](https://github.com/kabisa/maji/blob/master/docs/upgrade_guide.md) when upgrading Maji 1.x apps to Maji 2.
