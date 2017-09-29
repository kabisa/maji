import Settings from "./settings";
import Raven from "raven-js";

if (Settings.sentryDsn) {
  Raven.config(Settings.sentryDsn, {
    environment: process.env.NODE_ENV,
    release: __VERSION_NUMBER__,
    tags: {
      revision: __BUILD_IDENTIFIER__
    }
  }).install();
} else {
  if (process.env.NODE_ENV === "production") {
    /* eslint-disable no-console */
    console.warn(`Sentry exception tracking is NOT enabled. Either add a 'sentryDsn' property
    in 'settings.production.json' or remove the Sentry import in index.js to silence this warning.`);
    /* eslint-enable no-console */
  }
}

export default Raven;
