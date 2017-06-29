import { h } from "preact";
import { Router as PreactRouter } from "preact-router";

import { history } from "src/support/history";
import { augmentRouter } from "src/support/pageTransitionSupport";
import WelcomePage from "src/containers/WelcomePage";
import DetailPage from "src/containers/DetailPage";

const Router = augmentRouter(PreactRouter);

export default () => (
  <Router history={history}>
    <DetailPage path="/detail" />
    <WelcomePage default />
  </Router>
);
