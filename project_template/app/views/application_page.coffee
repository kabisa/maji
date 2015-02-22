Maji = require('maji')
bus  = require('../app').bus

class ApplicationPage extends Maji.Page
  events:
    'click [data-rel=back]': 'goBack'

  constructor: ->
    super
    @listenTo bus.vent, 'app:backbutton', @onBackButton

  goBack: (e) ->
    e && e.preventDefault()
    bus.execute('go-back', this.$('a[data-rel=back]').attr('href'))

  onBackButton: (e) ->
    bus.execute('go-back') unless @shouldIgnoreBackButton()

  shouldIgnoreBackButton: ->
    # implement your logic here when to ignore the back button,
    # for example while you're showing a loading indicator etc.
    false

  navigate: (href, options = {}) ->
    bus.commands.execute 'navigate', href, options

module.exports = ApplicationPage
