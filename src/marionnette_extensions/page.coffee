Marionette = require('backbone.marionette')

class Page extends Marionette.View
  transition: 'maji-page-slide'
  className: 'maji-page'

  canGoBack: ->
    @_parent.canGoBack()

  transitionBack: (route, options) ->
    @_parent.goBack(route, options)

  transitionHome: (route, transition) ->
    @_parent.goHome(route, transition)

module.exports = Page
