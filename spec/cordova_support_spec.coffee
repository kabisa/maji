window.cordova = { platformId: 'web' }
require('./spec_helper')
require('../src/cordova_support')

Radio = require('backbone.radio')

describe 'CordovaSupport', ->
  ['deviceready', 'pause', 'resume', 'backbutton', 'offline', 'online'].forEach (event) ->
    it "publishes '#{event}' on the app channel", (done) ->
      Radio.channel('app').on 'deviceready', done
      $(document).trigger('deviceready')

  it 'adds a class on document.body indicating cordova platformId', ->
    expect($(document.body)).to.have.class('platform-web')
