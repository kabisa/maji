app        = require('app/app')
Marionette = require('backbone.marionette')

class HomeRouter extends Marionette.AppRouter
  routes:
    ''       : 'home'
    'detail' : 'detail'

  home: ->
    IndexPage = require('./views/index_page')
    app.showView new IndexPage()

  detail: ->
    DetailPage = require('./views/detail_page')
    app.showView new DetailPage()

app.on 'start', ->
  new HomeRouter
