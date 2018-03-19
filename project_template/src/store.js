import { createStore, combineReducers } from "redux";
import { welcome } from "src/modules/welcome/reducer";

const rootReducer = combineReducers({
  welcome
  // additional reducers would be added here
});

const devtools = () =>
  (process.env.NODE_ENV !== "production" &&
    window.__REDUX_DEVTOOLS_EXTENSION__ &&
    window.__REDUX_DEVTOOLS_EXTENSION__()) ||
  (f => f);

const store = createStore(rootReducer, devtools());

export default store;
