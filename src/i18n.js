import I18n from "i18n-js";

// allows nl-NL to fallback to nl if no nl-NL translation is defined
I18n.fallbacks = true;

I18n.autoDetectLocale = ({ defaultLocale }) => {
  const userLocale = navigator.userLanguage || navigator.language;
  I18n.defaultLocale = defaultLocale;

  if (userLocale in I18n.translations) {
    // exact locale is supported, use that
    return (I18n.locale = userLocale);
  }

  const language = userLocale.match(/^[a-z]{2}/i)[0];
  for (const locale in I18n.translations) {
    if (locale.match(/^[a-z]{2}/i)[0] === language) {
      // we've got a match on language, use that
      return (I18n.locale = locale);
    }
  }
};

// no match at all, fall back to default locale
I18n.locale = I18n.defaultLocale;

export default I18n;
