import { h } from "preact";
import styles from "./BottomMenu.scss";

// Please make sure:
// 1. Items link to existing pages
// 2. The items fit on the minimum screen width
// 3. Active menu item gets the styles.active class
export const BottomMenu = () => (
  <nav class={styles.bottomMenu}>
    <ul>
      <li>
        <a href="#proper-link-to-item">Item 1</a>
      </li>
      <li>
        <a href="#proper-link-to-item">Item 2</a>
      </li>
      <li class={styles.active}>
        <a href="#proper-link-to-item">Item 3</a>
      </li>
      <li>
        <a href="#proper-link-to-item">Item 4</a>
      </li>
    </ul>
  </nav>
);
