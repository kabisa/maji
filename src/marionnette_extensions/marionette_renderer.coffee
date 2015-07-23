Marionette      = require('backbone.marionette')
I18n            = require('../lib/i18n')
templateHelpers = require('../lib/template_helpers')

module.exports.setup = ->
  defaultRender = Marionette.Renderer.render

  Marionette.Renderer.render = (template, data) ->
    data.t = -> I18n.t.apply(I18n, arguments)
    data.l = -> I18n.l.apply(I18n, arguments)
    data.h = templateHelpers

    defaultRender(template, data)
