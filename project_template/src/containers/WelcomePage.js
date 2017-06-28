import { h } from "preact";
import I18n from "src/config/i18n";
import { Page, Main } from "src/components/Page";
import { Header } from "src/components/Header";
import { List, ListItem } from "src/components/NavList";

export default () => (
  <Page>
    <Header>
      <h1>{I18n.t("welcome.title")}</h1>
    </Header>
    <Main>
      <p>{I18n.t("welcome.hello")}</p>
      <p>
        <strong>{I18n.t("welcome.transitions")}</strong>
      </p>
      <List>
        <ListItem href="/detail" icon="forward">Slide</ListItem>
        <ListItem href="/detail" icon="forward">Slide up</ListItem>
        <ListItem href="/detail" icon="forward">Flip</ListItem>
      </List>
    </Main>
  </Page>
);
