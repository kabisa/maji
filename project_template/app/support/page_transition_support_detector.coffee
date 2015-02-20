$ = require('jquery')

class PageTransitionSupportDetector
  @supportsTransitions: ->
    if !! $.os.android && parseFloat($.os.version) < 4
      # we don't support transitions on Android < 4
      false
    else
      # we do support on all other browsers
      true

module.exports = PageTransitionSupportDetector
