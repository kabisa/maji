ApplicationPage = require('app/views/application_page')
template        = require('../templates/index')
$               = require('jquery')

class IndexPage extends ApplicationPage
  template: template

  events:
    'click': (e) ->
      e.preventDefault()
      target = $(e.target)

      @navigate(target.attr('href'), transition: target.data('transition'))

module.exports = IndexPage
