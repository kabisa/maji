app        = require('../../app')
Marionette = require('backbone.marionette')

HomeApp = app.module('home')
HomeApp.startWithParent = false

class HomeApp.Router extends Marionette.AppRouter
  appRoutes:
    ''      : 'home'

API =
  home: ->
    IndexPage = require('./views/index_page')
    app.mainRegion.show new IndexPage()

HomeApp.addInitializer ->
  new HomeApp.Router
    controller: API

module.exports = HomeApp
