{ UnrecoverableError } = require './base_error'

SERVICE_ERROR = 'Unexpected error occurred'

class ServiceError extends UnrecoverableError
  constructor: (message, cause) ->
    super message || SERVICE_ERROR, cause

module.exports = ServiceError
