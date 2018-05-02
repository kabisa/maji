import { h, Component } from "preact";
import { connect } from "preact-redux";
import I18n from "src/config/i18n";
import { Page, Main } from "src/components/Layout";
import { Header } from "src/components/Header";
import { List, ListItem } from "src/components/NavList";
import Counter from "../components/Counter";
import * as actions from "../actions";

export class WelcomePage extends Component {
  render({ counter, ...otherProps }) {
    return (
      <Page>
        <Header>
          <h1>
            {"<$= appName $>"} {__VERSION_NUMBER__}
          </h1>
        </Header>
        <Main>
          <p>{I18n.t("welcome.hello")}</p>
          <p>
            <strong>{I18n.t("welcome.transitions")}</strong>
          </p>
          <List>
            <ListItem href="/detail" icon="forward">
              Slide
            </ListItem>
            <ListItem href="/detail?transition=slideup" icon="forward">
              Slide up
            </ListItem>
            <ListItem href="/detail?transition=flip" icon="forward">
              Flip
            </ListItem>
          </List>
          <p>
            <strong>{I18n.t("welcome.counter")}</strong>
          </p>
          <Counter value={counter} {...otherProps} />
        </Main>
      </Page>
    );
  }
}

const mapStateToProps = state => ({ counter: state.welcome.counter });
const mapDispatchToProps = dispatch => ({
  onIncrement: () => dispatch({ type: actions.COUNTER_INCREMENT }),
  onDecrement: () => dispatch({ type: actions.COUNTER_DECREMENT })
});

export default connect(mapStateToProps, mapDispatchToProps)(WelcomePage);
