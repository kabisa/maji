# keeping ApplicationState for backward compatibility and re-using code to bring it under test
ApplicationState = require('./application_state')

class JsonSetting
  constructor: (key) ->
    @key = key

  get: ->
    ApplicationState.get(@key)

  set: (value) ->
    ApplicationState.set(@key, value)

  reset: ->
    ApplicationState.reset(@key)

module.exports = JsonSetting
