{ I18n } = require('maji')
Settings = require('./settings')

I18n.translations =
  en: require('./locales/en.yml').en

I18n.autoDetectLocale(defaultLocale: Settings.defaultLocale)
