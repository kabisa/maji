require('./config/bugsnag')
require('./config/jquery')
require('./config/i18n')
require('./config/template_helpers')

Backbone                      = require('backbone')
Marionette                    = require('backbone.marionette')
PageTransitionSupportDetector = require('./support/page_transition_support_detector')
Maji                          = require('maji')

app = new Maji.Application
  showTransitions: PageTransitionSupportDetector.supportsTransitions()

app.addInitializer ->
  require('./modules/home/home_app').start()

app.on 'initialize:after', (options) ->
  Backbone.history.start(root: 'index.html', silent: true)
  Backbone.history.navigate "#/#{Backbone.history.fragment}", trigger: true

app.bus.reqres.setHandler 'view:current', ->
  app.mainRegion.currentView

app.bus.reqres.setHandler 'uri:current', ->
  Backbone.history.fragment

app.bus.commands.setHandler 'navigate', (location, options = {}) ->
  app.mainRegion.navigate(location, options)

app.bus.commands.setHandler 'go-back', (where, opts) ->
  where = undefined if where == '#'
  app.mainRegion.goBack(where, opts)

module.exports = app
