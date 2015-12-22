app        = require('app/app')
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
    app.mainRegion.show new IndexPage(), preventDestroy: true
  detail: ->
    DetailPage = require('./views/detail_page')
    app.mainRegion.show new DetailPage(), preventDestroy: true

HomeApp.addInitializer ->
  new HomeApp.Router
    controller: API

module.exports = HomeApp
