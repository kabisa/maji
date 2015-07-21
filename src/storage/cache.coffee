CACHE_KEY_PREFIX = 'cache:'

class CacheItem
  constructor: (@value, ttl) ->
    @expiresAt = new Date(new Date().getTime() + ttl * 1000)

class Cache
  set: (key, value, { ttl }) ->
    item = new CacheItem(value, ttl)
    localStorage.setItem(@_key(key), JSON.stringify(item))

  get: (key) ->
    @_purgeExpiredItems()

    @_rawGet(@_key(key))?.value || null

  _rawGet: (key) ->
    item = localStorage.getItem(key)
    JSON.parse(item) if item

  _key: (name) ->
    CACHE_KEY_PREFIX + name

  _purgeExpiredItems: ->
    _.chain(Object.keys(localStorage))
      .filter (key) -> new RegExp("^#{CACHE_KEY_PREFIX}").test(key)
      .map (key) => [key, @_rawGet(key)]
      .filter ([key, item]) -> new Date(item.expiresAt) < new Date()
      .each ([key, item]) -> localStorage.removeItem(key)

module.exports = new Cache()
