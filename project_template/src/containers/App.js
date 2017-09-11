import { h } from "preact";
import { Router as PreactRouter } from "preact-router";

import { history } from "src/support/history";
import { augmentRouter } from "src/support/pageTransitionSupport";
import WelcomePage from "src/modules/welcome/containers/WelcomePage";
import DetailPage from "src/modules/welcome/containers/DetailPage";

const Router = augmentRouter(PreactRouter);

const App = () => (
  <Router history={history}>
    <DetailPage path="/detail" />
    <WelcomePage default />
  </Router>
);

export default App;
