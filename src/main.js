import I18n from "./i18n";
import registerCordovaSupport from "./cordovaSupport";
import * as PageTransitionSupport from "./pageTransitionSupport";

registerCordovaSupport();

export { I18n, PageTransitionSupport };
