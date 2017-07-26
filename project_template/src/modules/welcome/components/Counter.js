import { h } from "preact";

export default ({ value, onIncrement, onDecrement }) => (
  <counter>
    <p>Counter value: {value}</p>
    <button onClick={onIncrement}>+</button>
    <button onClick={onDecrement}>-</button>
  </counter>
);
