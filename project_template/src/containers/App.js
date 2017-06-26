import { h } from "preact";
import Router from "preact-router";
import createHistory from "history/createHashHistory";
import I18n from "src/config/i18n";

import Icon from "src/utils/Icon";
const Greeter = ({ name }) => <p>Hello {name}!</p>;

export default () => (
  <Router history={createHistory()}>
    <Greeter path="/hello/:name" />
    <div default>
      <p>{I18n.t("hello")}</p>

      <Icon id="back" fill="blue" style={{ opacity: "0.2" }} />
      <Icon id="forward" />

      <Greeter name="stranger" />
      <a href="/hello/friend">Say hello to friend!</a>
    </div>
  </Router>
);
