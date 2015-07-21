_ = require('underscore')

class NavigationStack
  constructor: ->
    @stack = []
    @_prevRoute = null

  unshift: (navigationElement) ->
    @stack.unshift navigationElement

  push: (navigationElement) ->
    @stack.push navigationElement

  pop: ->
    @_prevRoute = @stack.pop()

  unwind: (route) ->
    for item, i in @stack by -1
      if item.route == route
        @_prevRoute = @stack[i + 1] || @stack[i]
        @stack = @stack[0.. i]
        return @_prevRoute

  clear: ->
    @stack = []

  get: (index) ->
    @stack[index]

  prevRoute: ->
    @_prevRoute?.route

  length: ->
    @stack.length

  toString: ->
    _.pluck(@stack, 'route').join(', ')

module.exports = NavigationStack
