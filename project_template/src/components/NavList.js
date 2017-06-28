import { h } from "preact";
import Icon from "./Icon";
import styles from "./NavList.scss";

export const List = ({ children }) => (
  <ul class={styles.list}>
    {children}
  </ul>
);

export const ListItem = ({ href, icon, children }) => (
  <li>
    <a href={href}>
      <span>{children}</span>
      {icon && <Icon id={icon} class={styles.chevron} />}
    </a>
  </li>
);
