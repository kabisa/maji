import { h } from "preact";
import Router from "preact-router";
import createHistory from "history/createHashHistory";

import WelcomePage from "src/containers/WelcomePage";
import DetailPage from "src/containers/DetailPage";

export default () => (
  <Router history={createHistory()}>
    <DetailPage path="/detail" />
    <WelcomePage default />
  </Router>
);
