Maji     = require('maji')
{ I18n } = require('maji')

# global template helpers can be defined here.
# These helpers will be exposed in templates under the 'h' namespace.
#
# E.g a 'pluralize' helper could be called from a template as
# h.pluaralize 'something'
class AppTemplateHelpers

Maji.TemplateHelpers.register(new AppTemplateHelpers())
