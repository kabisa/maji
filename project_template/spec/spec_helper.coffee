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
window.wait = (delay = 1) ->
  d = When.defer()
  setTimeout(
    -> d.resolve()
    delay
  )
  d.promise
