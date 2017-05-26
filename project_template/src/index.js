import "./styles/shell.scss";
import { h, render } from "preact";
import "maji";

const renderApp = function() {
  const App = require("./containers/App").default;
  const root = document.querySelector("#app");

  root.innerHTML = "";
  render(<App />, root);
};

renderApp();

if (process.env.NODE_ENV !== "production") {
  require("preact/devtools");

  if (module.hot) {
    module.hot.accept();
  }
}
