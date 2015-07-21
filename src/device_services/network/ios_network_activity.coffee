$ = require('jquery')

module.exports =
  init: ->
    return unless window.NetworkActivity

    $(document).on 'ajaxStart', ->
      NetworkActivity.activityStart()

    $(document).on 'ajaxStop', ->
      NetworkActivity.activityStop()
