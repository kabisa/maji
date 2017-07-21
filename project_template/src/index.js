import "babel-polyfill";
import "./styles/shell.scss";
import { h, render } from "preact";
import "src/config/sentry";
import FastClick from "fastclick";

const renderApp = function() {
  const App = require("./containers/App").default;
  const root = document.querySelector("#maji-app");

  root.innerHTML = "";
  render(<App />, root);
};

FastClick.attach(document.body);
renderApp();

if (process.env.NODE_ENV !== "production") {
  require("preact/devtools");

  if (module.hot) {
    module.hot.accept();
  }
}
