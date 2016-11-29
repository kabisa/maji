_                = require('underscore')
Marionette       = require('backbone.marionette')
AnimatableRegion = require('./animatable_region')
bus              = require('../lib/bus')

class Application extends Marionette.Application
  region: '#maji-app'
  regionClass: AnimatableRegion

  initialize: (opts = {}) ->
    require('./marionnette_extensions/marionette_renderer').setup()
    require('./cordova_support')
    @bus = bus

    _.defaults opts,
      showTransitions: true
    @getRegion().showTransitions = opts.showTransitions

module.exports = Application
