_ = require('underscore')
ApplicationState = require('./application_state')

CACHE_KEY_PREFIX = 'cache:'

class CacheItem
  constructor: (@value, ttl) ->
    @expiresAt = new Date(new Date().getTime() + (ttl * 1000))

class ItemCache
  constructor: (@cache, @key, @opts) ->

  get: ->
    @cache.get(@key)

  set: (value) ->
    @cache.set(@key, value, @opts)

class Cache
  getCacheFor: (key, opts) ->
    new ItemCache(this, key, opts)

  set: (key, value, { ttl }) ->
    item = new CacheItem(value, ttl)
    ApplicationState.set(@_key(key), item)

  get: (key) ->
    @_purgeExpiredItems()

    @_rawGet(@_key(key)) || null

  _rawGet: (key) ->
    ApplicationState.get(key)?.value

  _key: (name) ->
    CACHE_KEY_PREFIX + name

  _purgeExpiredItems: ->
    _.chain(Object.keys(localStorage))
      .filter (key) -> new RegExp("^#{CACHE_KEY_PREFIX}").test(key)
      .map (key) => [key, @_rawGet(key)]
      .filter ([key, item]) => new Date(item.expiresAt) < @_currentDate()
      .each ([key, item]) ->
        ApplicationState.reset(key)

  _currentDate: ->
    new Date()

module.exports = new Cache()
