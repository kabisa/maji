AnimatableRegion = require '../src/animatable_region'
Page             = require '../src/page'

class TestPage extends Page
  render: ->

describe 'AnimatableRegion', ->
  before ->
    @region = new AnimatableRegion(el: 'body')

  it 'transitions pages', (done) ->
    @region.show(new TestPage(id: 'page-1'))
    @region.show(new TestPage(id: 'page-2'))

    setTimeout ->
      expect($('#page-1')).not.to.exist
      expect($('#page-2')).to.exist
      done()
    , 1000
