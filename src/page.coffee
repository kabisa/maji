Marionette = require('backbone.marionette')

class Page extends Marionette.Layout
  transition: 'slide'
  className: 'page'

module.exports = Page
