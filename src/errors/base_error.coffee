# Custom error should be derived from RecoverableError or UnrecoverableError

class BaseError extends Error
  toString: ->
    @message.message

class RecoverableError extends BaseError
  constructor: (@message, @cause) ->
    @retryable = true
    super

class UnrecoverableError extends BaseError
  constructor: (@message, @cause) ->
    @retryable = false
    super

module.exports =
  BaseError: BaseError
  RecoverableError:  RecoverableError
  UnrecoverableError:  UnrecoverableError
