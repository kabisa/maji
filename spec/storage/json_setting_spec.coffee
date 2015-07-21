JsonSetting = require '../../src/storage/json_setting'

describe 'JsonSetting', ->
  mySetting = {
    number: 1,
    string: 'aString'
    object: { attribute: 'someAttribute' }
  }

  beforeEach ->
    localStorage.clear()
    @storageKey = 'setting_name'
    @sut = new JsonSetting(@storageKey)

  context 'Clear storage', ->
    it 'storage key not present', ->
      expect(localStorage.getItem(@storageKey)).not.to.present

    it 'returns mySetting as object', ->
      expect(@sut.get()).not.to.present

  describe '#set and #get',->
    context 'Set setting', ->
      beforeEach ->
        @sut.set mySetting

      it 'object stored with setting key', ->
        expect(localStorage.getItem(@storageKey)).to.be.present

      it '#get returns mySetting as object', ->
        expect(@sut.get()).to.eql mySetting

  describe '#reset',->
    context 'Reset after set setting', ->
      beforeEach ->
        @sut.set mySetting
        @sut.reset()

      it 'storage key not present', ->
        expect(localStorage.getItem(@storageKey)).not.to.present

      it 'returns nothing, after reset', ->
        expect(@sut.get()).not.to.present
