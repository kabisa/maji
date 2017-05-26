import { h } from "preact";
import Router from "preact-router";
import I18n from "src/config/i18n";

const Greeter = ({ name }) => <p>Hello {name}!</p>;

export default () => (
  <Router>
    <Greeter path="/hello/:name" />
    <div default>
      <p>{I18n.t("hello")}</p>

      <Greeter name="stranger" />
      <a href="/hello/friend">Say hello to friend!</a>
    </div>
  </Router>
);
