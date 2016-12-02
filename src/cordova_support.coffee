$     = require('jquery')
Radio = require('backbone.radio')


initCordova = ->
  $(document).on 'deviceready', ->
    require('./cordova/ios_network_activity').init()

  for eventName in ['pause', 'resume', 'backbutton', 'offline', 'online']
    $(document).on eventName, (e) ->
      Radio.channel('app').trigger(e.type)

  $ ->
    $('body').addClass("platform-#{cordova.platformId}")

initCordova() if window.cordova
