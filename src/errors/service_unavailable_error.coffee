{ RecoverableError } = require './base_error'

SERVICE_UNAVAILABLE = 'Service Unavailable Error'

class ServiceUnavailableError extends RecoverableError
  constructor: (message, cause) ->
    super message || SERVICE_UNAVAILABLE, cause

module.exports = ServiceUnavailableError
