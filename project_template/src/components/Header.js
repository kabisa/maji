import { h } from "preact";
import Icon from "./Icon";
import styles from "./Header.scss";

export const BackButton = ({ href }) => (
  <a href={href}>
    <Icon id="back" class={styles.icon} />
  </a>
);

export const Header = ({ children }) => {
  return (
    <header class={styles.header}>
      {children}
    </header>
  );
};
