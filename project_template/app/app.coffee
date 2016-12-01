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

app.on 'before:start', ->
  # include modules
  require('./modules/home/home_app')

app.on 'before:start', ->
  # Bind the start event in after the inclusion of
  # the modules, so that the routers are initialized
  # before the kick-off of the backbone history
  app.on 'start', (options) ->
    Backbone.history.start()

app.bus.reqres.setHandler 'view:current', ->
  app.getView()

app.bus.reqres.setHandler 'uri:current', ->
  Backbone.history.fragment

app.bus.commands.setHandler 'navigate', (location, options = {}) ->
  app.getRegion().navigate(location, options, Backbone.history)

app.bus.commands.setHandler 'go-back', (where, opts) ->
  where = undefined if where == '#'
  app.getRegion().goBack(where, opts)

module.exports = app
