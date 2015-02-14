_ = require('underscore')

# Holder of template helpers.
# Apps can register helpers by calling `Maji.TemplateHelpers.register()`.
class TemplateHelpers
  register: (helpers) ->
    _.extend(this, helpers)

module.exports = new TemplateHelpers()
