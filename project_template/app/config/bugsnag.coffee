Settings = require('./settings')

if Settings.bugsnagApiKey
  Bugsnag = require('bugsnag-js')
  Bugsnag.apiKey = Settings.bugsnagApiKey
