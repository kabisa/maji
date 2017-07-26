import { createStore, combineReducers } from "redux";
import { welcome } from "src/modules/welcome/reducer";

const rootReducer = combineReducers({
  welcome
  // additional reducers would be added here
});

const store = createStore(
  rootReducer,
  window.devToolsExtension ? window.devToolsExtension() : f => f
);

export default store;
