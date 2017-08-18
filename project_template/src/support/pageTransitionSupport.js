import { h, Component } from "preact";
import { history } from "./history";

const DEFAULT_TRANSITION_ANIMATION = "slide";

function transitionAnimationForPage(page) {
  if (page && page.attributes && page.attributes.transition) {
    return page.attributes.transition;
  }
  return DEFAULT_TRANSITION_ANIMATION;
}

class PageContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentPage: props.children[0]
    };
  }

  componentWillReceiveProps(props) {
    const nextPage = props.children[0];
    const previousPage = this.state.currentPage;

    if (nextPage.nodeName !== previousPage.nodeName) {
      this.setState({ previousPage, currentPage: nextPage });
    }
  }

  render() {
    const isBack = history.action !== "PUSH";
    const animation = isBack && this.state.previousPage != null
      ? transitionAnimationForPage(this.state.previousPage)
      : transitionAnimationForPage(this.state.currentPage);

    const currentClassName = this.state.previousPage == null
      ? ""
      : `maji-page-animating maji-page-animation-${animation} maji-page-incoming${isBack ? " maji-page-reverse" : ""}`;
    const previousClassName = this.state.previousPage == null
      ? ""
      : `maji-page-animating maji-page-animation-${animation} maji-page-outgoing${isBack ? " maji-page-reverse" : ""}`;

    return (
      <div class="maji-page-container">
        <div class={currentClassName}>
          {this.state.currentPage}
        </div>
        <div
          class={previousClassName}
          onAnimationEnd={() => this.setState({ previousPage: null })}
        >
          {this.state.previousPage}
        </div>
      </div>
    );
  }
}

export const augmentRouter = function(RouterClass) {
  return class TransitionAwareRouter extends RouterClass {
    render() {
      return <PageContainer>{super.render(...arguments)}</PageContainer>;
    }
  };
};
