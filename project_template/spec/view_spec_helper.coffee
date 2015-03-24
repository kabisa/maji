require('./spec_helper')
require('../app/config/i18n')
require('maji/lib/marionette_renderer').setup()

# expose jquery on window for ease of use in specs
$ = window.$ = require('jquery')

before ->
  # create an iframe where specs can append there DOM elements,
  # so the DOM can be debugged interactively.
  contextFrame = $('<iframe id="test-context"/>')
    .css('position', 'fixed')
    .css('top', '70px').css('right', '10px')
    .css('width', '40%').css('height', '80%')
    .css('border', '1px solid #eee')
  $('#mocha').append(contextFrame)
  window.DOM = contextFrame.contents().find('body')

  $('#mocha-report').css('max-width', '55%')

beforeEach ->
  DOM.html('')
