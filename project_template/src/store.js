import { createStore, combineReducers } from "redux";
import { welcome } from "src/modules/welcome/reducer";

const rootReducer = combineReducers({
  welcome
  // additional reducers would be added here
});

const store = createStore(
  rootReducer,
  window.__REDUX_DEVTOOLS_EXTENSION__
    ? window.__REDUX_DEVTOOLS_EXTENSION__()
    : f => f
);

export default store;
