ApplicationPage = require('app/views/application_page')
template        = require('../templates/index')
$               = require('jquery')

class IndexPage extends ApplicationPage
  template: template

  events:
    'click a[data-transition]': (e) ->
      target = $(e.currentTarget)
      @navigate(target.attr('href'), transition: target.data('transition'))
      return false

module.exports = IndexPage
