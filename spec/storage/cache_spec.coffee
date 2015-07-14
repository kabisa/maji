require '../spec_helper'
Cache = require '../../src/storage/cache'

describe 'Cache', ->
  mySetting = {
    number: 1,
    string: 'aString'
    object: { attribute: 'someAttribute' }
  }

  beforeEach ->
    localStorage.clear()
    @storageKey = 'setting_name'
    @ttlInSeconds = 60;

  describe 'cache', ->
    context 'Item stored with ttl of 60 seconds', ->
      beforeEach ->
        Cache.set(@storageKey, mySetting, ttl: @ttlInSeconds)

      describe 'Cache hit', ->
        it 'return item from cache', ->
          expect(Cache.get(@storageKey)).to.eql mySetting

      describe 'Cache miss', ->
        beforeEach ->
          @stubCurrentDate = sinon.stub(Cache, '_currentDate')
          expiredDate = new Date(new Date().getTime() + (@ttlInSeconds * 1000) + 1)
          @stubCurrentDate.returns(expiredDate)

        afterEach ->
          @stubCurrentDate.restore()

        it 'return nothing from cache', ->
          expect(Cache.get(@storageKey)).not.to.present

  describe 'item cache', ->
    context 'Item stored with ttl of 60 seconds', ->
      beforeEach ->
        @sut = Cache.getCacheFor(@storageKey, ttl: @ttlInSeconds)
        @sut.set(mySetting)

      describe 'Item Cache hit', ->
        it 'return item from cache', ->
          expect(@sut.get(@storageKey)).to.eql mySetting

      describe 'Item Cache miss', ->
        beforeEach ->
          @stubCurrentDate = sinon.stub(Cache, '_currentDate')
          expiredDate = new Date(new Date().getTime() + (@ttlInSeconds * 1000) + 1)
          @stubCurrentDate.returns(expiredDate)

        afterEach ->
          @stubCurrentDate.restore()

        it 'return nothing from cache', ->
          expect(@sut.get(@storageKey)).not.to.present


