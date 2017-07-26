import "babel-polyfill";
import "./styles/shell.scss";
import { h, render } from "preact";
import { Provider } from "preact-redux";
import FastClick from "fastclick";
import "src/config/sentry";
import store from "./store";

const renderApp = function() {
  const App = require("./containers/App").default;
  const root = document.querySelector("#maji-app");

  root.innerHTML = "";
  render(
    <Provider store={store}>
      <App />
    </Provider>,
    root
  );
};

FastClick.attach(document.body);
renderApp();

if (process.env.NODE_ENV !== "production") {
  require("preact/devtools");

  if (module.hot) {
    module.hot.accept();
  }
}
