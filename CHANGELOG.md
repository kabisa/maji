# Change Log
All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](http://keepachangelog.com/)
and this project adheres to [Semantic Versioning](http://semver.org/).

## 2.0.0
### Added
- memo-is for using memoization in specs

### Changed

- Updated Marionette to 3.1
- Updated Backbone to 1.3.3
- Updated Mocha to 3.1.2
- Updated jQuery to 3.0.0
- Node.js >= 6 is now required
- Switched from Browserify to webpack module bundler

### Removed

- Maji plugin management (`cordova/plugins.txt`) in favor of Cordova plugin management
- Maji application bus in favor of Backbone.Radio
- Maji Cordova platform management, see upgrade guide for details
