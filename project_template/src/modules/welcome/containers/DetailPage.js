import { h } from "preact";
import I18n from "src/config/i18n";
import { Page, Main } from "src/components/Layout";
import { Header, BackButton } from "src/components/Header";

const DetailPage = () => (
  <Page>
    <Header>
      <BackButton href="/" />
      <h1>{I18n.t("detail.title")}</h1>
    </Header>
    <Main>
      <p>{I18n.t("detail.description")}</p>
    </Main>
  </Page>
);

export default DetailPage;
