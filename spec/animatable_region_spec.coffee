AnimatableRegion = require '../src/animatable_region'
Page             = require '../src/page'

class TestPage extends Page
  render: ->

describe 'AnimatableRegion', ->

  delayedAssert = (assert) ->
    setTimeout ->
      assert()
      done()
    , 1000

  currentPage = new TestPage(id: 'page-1')
  nextPage = new TestPage(id: 'page-2')

  before ->
    @region = new AnimatableRegion(el: 'body')
    @region.show(currentPage)

  context 'When no transactions have taken place yet', ->
    it 'can go back returns false', ->
      expect(@region.canGoBack()).to.be.false

  context 'after transition', ->
    beforeEach ->
      @region.show(nextPage)

      it 'can go back returns true', ->
        expect(@region.canGoBack()).to.be.true

      it 'current page does not exist any longer', (done) ->
        delayedAssert( -> expect($('#page-1')).not.to.exist)

      it 'next page is available', (done) ->
        delayedAssert( -> expect($('#page-2')).to.exist)
