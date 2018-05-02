import { h } from "preact";
import { Link } from "preact-router/match";
import styles from "./BottomMenu.scss";

const MenuItem = props => (
  <li>
    <Link activeClassName={styles.active} {...props} />
  </li>
);

// Please make sure:
// 1. Items link to existing pages
// 2. The items fit on the minimum screen width
// 3. Active menu item gets the styles.active class
export const BottomMenu = () => (
  <nav class={styles.bottomMenu}>
    <ul>
      <MenuItem href="/">Home</MenuItem>
      <MenuItem href="/detail">Detail</MenuItem>
    </ul>
  </nav>
);
