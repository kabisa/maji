import * as actions from "./actions";

const initialState = {
  counter: 0
};

export const welcome = (state = initialState, action) => {
  switch (action.type) {
    case actions.COUNTER_INCREMENT:
      return {
        ...state,
        counter: state.counter + 1
      };
    case actions.COUNTER_DECREMENT:
      return {
        ...state,
        counter: state.counter - 1
      };
    default:
      return state;
  }
};
