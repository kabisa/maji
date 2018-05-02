import { h } from "preact";
import { Router as PreactRouter } from "preact-router";

import { history } from "src/support/history";
import { PageTransitionSupport } from "maji";
import { Layout } from "src/components/Layout";
import WelcomePage from "src/modules/welcome/containers/WelcomePage";
import DetailPage from "src/modules/welcome/containers/DetailPage";

const Router = PageTransitionSupport.augmentRouter(PreactRouter, history);

const App = () => (
  <Layout>
    <Router history={history}>
      <DetailPage path="/detail" />
      <WelcomePage default />
    </Router>
  </Layout>
);

export default App;
