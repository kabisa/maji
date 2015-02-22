ApplicationPage = require('../../../views/application_page')
template        = require('../templates/index')
$               = require('jquery')
bus             = require('maji').bus

class IndexPage extends ApplicationPage
  template: template

  events:
    'click': (e) ->
      e.preventDefault()
      target = $(e.target)

      @navigate(target.attr('href'), transition: target.data('transition'))

module.exports = IndexPage
