$          = require('jquery')
bus        = require('./lib/bus')

publishOnBus = (e) ->
  bus.trigger("app:#{e.type}")

initCordova = ->
  $(document).on 'deviceready', ->
    require('./cordova/ios_network_activity').init()

  for eventName in ['pause', 'resume', 'backbutton', 'offline', 'online']
    $(document).on eventName, (e) ->
      publishOnBus(e)

  $ ->
    $('body').addClass("platform-#{cordova.platformId}")

initCordova() if window.cordova
