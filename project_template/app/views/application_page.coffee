Maji = require('maji')
Radio = require('backbone.radio')

class ApplicationPage extends Maji.Page
  events:
    'click [data-rel=home]': 'goHome'
    'click [data-rel=back]': 'goBack'

  constructor: ->
    super
    @listenTo Radio.channel('app'), 'backbutton', @onBackButton

  goHome: (e) ->
    e && e.preventDefault()
    @transitionHome(e.target.getAttribute('href'), 'slide')

  goBack: (e) ->
    e && e.preventDefault()
    @transitionBack(this.$('a[data-rel=back]').attr('href'))

  onBackButton: (e) ->
    @transitionBack() unless @shouldIgnoreBackButton()

  shouldIgnoreBackButton: ->
    # implement your logic here when to ignore the back button,
    # for example while you're showing a loading indicator etc.
    false

  navigate: (href, options = {}) ->
    Radio.channel('app').request('navigate', href, options)

module.exports = ApplicationPage
