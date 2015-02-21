$               = require('jquery')
attachFastClick = require('fastclick')
app             = require('./app')

$ ->
  app.start()
  attachFastClick(document.body)

  # Stretch main container height so it's not resized when the viewport is
  # resized. This happens on Android when the keyboard pops up.
  setTimeout ->
    window.containerOffsetTop = app.mainRegion.$el.offset().top
    initialWindowHeight = $(window).height() - window.containerOffsetTop
    app.mainRegion.$el.css('height', initialWindowHeight)
  , 0
