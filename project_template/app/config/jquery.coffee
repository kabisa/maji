$        = require('jquery')
Backbone = require('backbone')
Settings = require('./settings')

Backbone.$ = $
require('maji/lib/jquery-browser-detect')

$.ajaxSetup(
  timeout: Settings.network_timeout
)
