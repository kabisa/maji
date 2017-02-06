# Change Log
All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](http://keepachangelog.com/)
and this project adheres to [Semantic Versioning](http://semver.org/).

## 2.0.0
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
