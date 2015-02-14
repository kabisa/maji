Marionette       = require('backbone.marionette')
AnimatableRegion = require('./animatable_region')
bus              = require('./bus')
_                = require('underscore')

class Application extends Marionette.Application
  constructor: (opts = {}) ->
    super

    _.defaults opts,
      showTransitions: true

    require('./marionette_renderer').setup()
    require('./cordova_support')
    this.bus = bus

    @addRegions
      mainRegion: new AnimatableRegion(
        el: '#maji-app',
        showTransitions: opts.showTransitions
      )


module.exports = Application
