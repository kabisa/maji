ApplicationPage = require('../../../views/application_page')
template        = require('../templates/index')

class IndexPage extends ApplicationPage
  template: template

  events:
    'click .btn.left': 'showMenu'

  showMenu: ->
    if @.$el.hasClass('slideout')
      @.$el.removeClass('slideout').addClass('slideout-hidden')
      setTimeout((=>
        @.$el.removeClass('slideout-hidden')
        @.$('.slideout-menu').hide()
      ), 500)
    else
      @.$('.slideout-menu').show()
      @.$el.addClass('slideout')

module.exports = IndexPage
