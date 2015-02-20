require('./spec_helper')
require('../app/config/i18n')
require('maji/lib/marionette_renderer').setup()

# expose jquery on window for ease of use in specs
$ = window.$ = require('jquery')

beforeEach ->
  $('body').html('')
