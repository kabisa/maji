import { I18n } from "maji";
import Settings from "./settings";

I18n.translations = {
  en: require('./locales/en.yml').en
}

I18n.autoDetectLocale({ defaultLocale: Settings.defaultLocale });
export default I18n;
