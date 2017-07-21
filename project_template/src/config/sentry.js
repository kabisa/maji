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
}

export default Raven;
