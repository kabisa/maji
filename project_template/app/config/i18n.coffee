{ I18n } = require('maji')

I18n.translations =
  en: require('./locales/en.yml').en

I18n.autoDetectLocale()
