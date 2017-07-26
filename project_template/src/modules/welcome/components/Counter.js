import { h } from "preact";
import styles from "./Counter.scss";

export default ({ value, onIncrement, onDecrement }) => (
  <counter class={styles.counter}>
    <p>Counter is at {value}</p>
    <button onClick={onIncrement}>+</button>
    <button onClick={onDecrement}>-</button>
  </counter>
);
