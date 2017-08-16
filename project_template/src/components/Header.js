import { h } from "preact";
import Icon from "./Icon";
import styles from "./Header.scss";
import { goBack } from "src/support/history";

export const BackButton = ({ href }) => {
  const onClick = function(e) {
    e.preventDefault();
    e.stopImmediatePropagation();

    goBack(href);
  };

  return (
    <a href={href} onClick={onClick}>
      <Icon id="back" class={styles.icon} />
    </a>
  );
};

export const Header = ({ children }) => (
  <header class={styles.header}>
    {children}
  </header>
);
