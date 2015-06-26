Marionette = require('backbone.marionette')

class Page extends Marionette.Layout
  transition: 'slide'
  className: 'page'

  canGoBack: ->
    @_parent.canGoBack()

module.exports = Page
