_               = require('underscore')
Backbone        = require('backbone')
Marionette      = require('backbone.marionette')
NavigationStack = require('../lib/navigation_stack')

class AnimatableRegion extends Marionette.Region
  constructor: (opts = {}) ->
    _.defaults opts,
      showTransitions: true

    @showTransitions = opts.showTransitions
    @navigationStack = new NavigationStack()

    super

  navigate: (route, options = {}) ->
    @back = false
    @navigationOptions = options
    Backbone.history.navigate route, options

  canGoBack: ->
    @navigationStack.length() > 1

  goBack: (route, options = {}) ->
    @back = true
    @navigationOptions = options

    route ?= @navigationStack.get(@navigationStack.length() - 2)?.route
    route ?= ''

    window.location.hash = route

  show: (view, options = {}) ->
    view._parent = this
    return super(view, options) unless @showTransitions

    # determine what transition to use, @navigationOptions takes precedence
    @transition = @navigationOptions?.transition
    @transition ?= view.transition || options.transition

    if @transition
      @currentPage = @currentView
      options.preventClose = true

    super(view, options)

  # Marionette provides this hook to open a view. It is recommended to implement
  # transitions etc at this point.
  open: (view) ->
    currentFragment = Backbone.history.getFragment()

    # Try to unwind the navigation stack until the current route.
    # If we somehow navigate to a route we've already been before we
    # want to continue from there.
    previousNavigationItem = @navigationStack.unwind(currentFragment)

    # see if we might be navigating back
    @_log 'back requested' if @back
    if @back || @back == undefined && @_isNavigatingBack(currentFragment)
      @_log 'back detected' unless @back
      @back = true

      # if the stack has just been reset we want to push this page onto the stack,
      # even though were going back.
      if @navigationStack.length() == 0
        @navigationStack.push route: currentFragment, transition: @transition

      # use the transition that got us here, unless transitions were overridden
      if ! @navigationOptions?.transition?
        @transition = previousNavigationItem?.transition || @transition
    else
      @back = false
      unless @navigationOptions?.intermediate || previousNavigationItem
        # if this is an intermediate page then we don't want to include it in the
        # navigation history.
        # Also if we've determined we've already been to this route and we've unwind
        # the navigation stack then we should not push this route back into the stack.
        @navigationStack.push route: currentFragment, transition: @transition

    @_log 'stack:', @navigationStack.toString()

    # reset all navigation options
    @navigationOptions = null

    if ! @showTransitions || ! @transition
      return super(view)

    newPage = view
    newPage.$el.addClass('page-pre-in')
    newPage.$el.css('z-index', 10)

    this.$el.append(newPage.$el)

    @_log 'Using transition', @transition, 'and back =', @back

    if @currentPage
      @currentPage.trigger 'transitionstart'
      this.$el.addClass("viewport-transitioning viewport-#{@transition}")

      setTimeout((=>
        window.scrollTo(0,0)
        @currentPage.$el.addClass("animated #{@transition} out#{if @back then ' reverse' else ''}")

        newPage.$el.removeClass('page-pre-in')
        newPage.$el.addClass("animated #{@transition} in#{if @back then ' reverse' else ''}")

        # newPage.$el.one 'webkitAnimationEnd mozAnimationEnd msAnimationEnd oAnimationEnd animationend', =>
        # FIXME: this is a temporary workaround for animationend events often times not
        # firing on WP8. Transitions in the app all use the same duration so a setTimeout is good
        # enough as a workaround.
        setTimeout((=>
          newPage.$el.removeClass("animated #{@transition} in reverse")
          newPage.$el.css('z-index', '')

          # remove the current page, if any
          if @currentPage
            if @currentPage.close then @currentPage.close()
            else @currentPage.remove()
            @currentPage = null

          @back = undefined

          this.$el.removeClass('viewport-transitioning')
          this.$el.removeClass("viewport-#{@transition}")

          newPage.trigger 'transitioned'
        ), @_transitionDuration(@transition))
      ), 1)
    else
      newPage.$el.removeClass('page-pre-in')
      @back = undefined
      newPage.trigger 'transitioned'

  _isNavigatingBack: (fragment) ->
    return true if @back
    navigationItem = @navigationStack.get(@navigationStack.length() - 1)
    return false unless navigationItem

    navigationItem.route == fragment

  _log: ->
    if window.navigationStackDebug
      Array.prototype.unshift.call arguments, '[navigation]'
      console.log.apply console, arguments

  _transitionDuration: (transtionType) ->
    return 750 if transtionType == 'flip'
    return 350

module.exports = AnimatableRegion
