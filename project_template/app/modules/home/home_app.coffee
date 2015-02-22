app        = require('../../app')
Marionette = require('backbone.marionette')

HomeApp = app.module('home')
HomeApp.startWithParent = false

class HomeApp.Router extends Marionette.AppRouter
  appRoutes:
    ''       : 'home'
    'detail' : 'detail'

API =
  home: ->
    IndexPage = require('./views/index_page')
    app.mainRegion.show new IndexPage()
  detail: ->
    DetailPage = require('./views/detail_page')
    app.mainRegion.show new DetailPage()

HomeApp.addInitializer ->
  new HomeApp.Router
    controller: API

module.exports = HomeApp
