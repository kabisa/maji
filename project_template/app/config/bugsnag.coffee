Settings = require('./settings')

try
  Bugsnag = require('bugsnag-js')
  Bugsnag.apiKey = Settings.bugsnagApiKey if Settings.bugsnagApiKey
catch
  # ignore, bugsnag may not be included
