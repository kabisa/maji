import { h } from "preact";
import styles from "./Page.scss";

export const Main = ({ children }) => (
  <main class={styles.main}>{children}</main>
);

export const Page = ({ children }) => <div class={styles.page}>{children}</div>;
