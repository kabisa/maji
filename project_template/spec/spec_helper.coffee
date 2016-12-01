Backbone = require('backbone')
# Backbone.$ is not automatically set when backbone is loaded as CommonJS module
$ = Backbone.$ = require('jquery')

# Allow to use memo-isation in tests
#
# describe 'some feature', ->
#
#   data = memo().is -> { foo: 'bar' }
#
#   it 'shows bar', ->
#     expect(data().foo).to.eql 'bar'
#
#   describe 'when undefined', ->
#     data.is -> { foo: undefined }
#
#     it 'shows undefined', ->
#       expect(data().foo).to.be.undefined
#
window.memo = require('memo-is')

# Use wait for to wait for data to come in,
# DOM elements to exist, or spies
# to have been called
#
# waitFor(=> @collection.last()).then (lastMessage) -> # assertions
# waitFor(=> @spy.called).then -> expect(spy).to.have.been.calledWith('args')
# waitFor(=> @view.$('element').length > 0).then -> # assertions
#
window.waitFor = (test) ->
  d = $.Deferred()
  timeout = null
  i = setInterval(
    ->
      if (result = test())
        clearInterval i
        clearTimeout timeout
        d.resolve(result)
    2
  )
  timeout = setTimeout(1500,
    ->
      clearInterval i
      d.reject(new Error('waitFor never resolved'))
  )
  d.promise()
