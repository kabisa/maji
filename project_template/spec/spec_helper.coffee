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

When = require('when')

# Use wait for to wait for data to come in,
# DOM elements to exist, or spies
# to have been called
#
# waitFor(=> @collection.last()).then (lastMessage) -> # assertions
# waitFor(=> @spy.called).then -> expect(spy).to.have.been.calledWith('args')
# waitFor(=> @view.$('element').length > 0).then -> # assertions
#
window.waitFor = (test) ->
  d = When.defer()
  i = setInterval(
    ->
      if (result = test())
        clearInterval i
        d.resolve(result)
    2
  )
  d.promise.timeout(1500, new Error('waitFor never resolved'))
    .catch (e) ->
      clearInterval i
      throw e
