I18n = require('i18n-js')

# allows nl-NL to fallback to nl if no nl-NL translation is defined
I18n.fallbacks = true

I18n.autoDetectLocale = ->
  userLocale = navigator.userLanguage || navigator.language

  if userLocale of I18n.translations
    # exact locale is supported, use that
    return I18n.locale = userLocale

  language = userLocale.match(/^[a-z]{2}/i)[0]
  for locale of I18n.translations
    if locale.match(/^[a-z]{2}/i)[0] == language
      # we've got a match on language, use that
      return I18n.locale = locale

  # no match at all, fall back to default locale
  I18n.locale = I18n.defaultLocale

module.exports = I18n
