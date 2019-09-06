# Change Log
All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](http://keepachangelog.com/)
and this project adheres to [Semantic Versioning](http://semver.org/).

## [Unreleased]

### Changed

- before_platform_add hook is now compatible with Cordova 9 [#279](https://github.com/kabisa/maji/pull/279)
- Include polyfills based on browser list instead of usage. [#251](https://github.com/kabisa/maji/issues/251)
- Improved Windows compatibility [#210](https://github.com/kabisa/maji/issues/210)

## [3.4.1]

### Fixed

- pre-commit hook breaks `git add -p` [#186](https://github.com/kabisa/maji/issues/186)
- Run `cordova prepare` in `maji run` ([#255](https://github.com/kabisa/maji/pull/255))

## [3.4.0]

### Changed
- Disable Redux Devtools extension support in production by default [#230](https://github.com/kabisa/maji/pull/230)

### Fixed
- bin/setup uses not-yet installed dependency [#231](https://github.com/kabisa/maji/pull/231)
- Literal arguments not passed to `cordova build` ([#252](https://github.com/kabisa/maji/pull/252))

## [3.3.0]

### Changed
- Updated ChromeDriver wrapper [#220](https://github.com/kabisa/maji/pull/220)
- Live reload is now standard on when using `bin/maji start`

### Fixed
- Disabling livereload will no longer produce console errors
- Only include `cordova.js` if a cordova build is needed

## [3.2.2]

### Fixed
- Webpack removing dist/.keep during build

## [3.2.1]

Maji 3.2.1 is exactly the same as `3.2.0` but had to be republished as `3.2.1` due
to a publication mistake during 3.2.0 beta phase.

## [3.2.0]

### Added
- Environment variables starting with `MAJI_APP_` are injected by default. They can be referenced by `process.env.MAJI_APP_*` in your code. [#190](https://github.com/kabisa/maji/pull/190)
- Allow all external communication in Cordova by default. [#216](https://github.com/kabisa/maji/pull/216)
- New `create-maji-app` package to replace `maji new`. [#218](https://github.com/kabisa/maji/pull/218)

### Changed
- Nightwatch tests now run headless by default. [#200](https://github.com/kabisa/maji/pull/200)
- Upgraded Cordova platforms. [#217](https://github.com/kabisa/maji/pull/217)
- Maji no longer requires Bash. [#218](https://github.com/kabisa/maji/pull/218)

## 3.1.1

### Fixed
- Prevent remounting previousPage when doing page transition [#205](https://github.com/kabisa/maji/pull/205)

## 3.1.0
### Added
- Settings can be extended with default, env agnostic, settings. [#176](https://github.com/kabisa/maji/pull/176)

### Changed
- Made cosmetic changes to the documentation.
- Move pageTransitionSupport into Maji library. [#197](https://github.com/kabisa/maji/pull/197)

### Fixed
- Project creation with relative paths [#193](https://github.com/kabisa/maji/pull/193)
- New projects missing gitignore [#194](https://github.com/kabisa/maji/pull/194)
- Dist directory itself to be removed by webpack [#195](https://github.com/kabisa/maji/pull/195)
- Windows compatibility [#209](https://github.com/kabisa/maji/pull/209)

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
