import { h } from "preact";
import styles from "./Layout.scss";
import { BottomMenu } from "./BottomMenu";

export const Main = ({ children }) => (
  <main class={styles.main}>{children}</main>
);

export const Page = ({ children }) => <div>{children}</div>;

export const Layout = ({ children }) => (
  <div class={styles.layout}>
    {children}
    <BottomMenu />
  </div>
);
