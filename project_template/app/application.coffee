$               = require('jquery')
FastClick       = require('fastclick')
app             = require('./app')

$ ->
  app.start()
  FastClick.attach(document.body)

  # Stretch main container height so it's not resized when the viewport is
  # resized. This happens on Android when the keyboard pops up.
  setTimeout ->
    window.containerOffsetTop = $(app.getRegion().el).offset().top
    initialWindowHeight = $(window).height() - window.containerOffsetTop
    $(app.getRegion().el).css('height', initialWindowHeight)
  , 0
