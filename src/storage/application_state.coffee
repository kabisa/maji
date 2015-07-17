class ApplicationState
  get: (key) ->
    item = localStorage.getItem(key)
    JSON.parse(item) if item

  set: (key, value) ->
    localStorage.setItem(key, JSON.stringify(value))

  reset: (key) ->
    localStorage.removeItem(key)

module.exports = new ApplicationState()
