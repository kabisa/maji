_                = require('underscore')
Marionette       = require('backbone.marionette')
AnimatableRegion = require('./animatable_region')
bus              = require('../lib/bus')

class Application extends Marionette.Application
  constructor: (opts = {}) ->
    super

    _.defaults opts,
      showTransitions: true

    require('./marionnette_extensions/marionette_renderer').setup()
    require('./cordova_support')
    this.bus = bus

    @addRegion('mainRegion', new AnimatableRegion(
      el: '#maji-app',
      showTransitions: opts.showTransitions
    ))

module.exports = Application
