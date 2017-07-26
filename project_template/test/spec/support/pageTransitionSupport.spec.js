import { h, render, Component } from "preact";
import { augmentRouter } from "src/support/pageTransitionSupport";
import { history } from "src/support/history";

class FakeRouter extends Component {
  render({ children }) {
    return children;
  }
}

const Router = augmentRouter(FakeRouter);
const PageA = () => <h1>PageA</h1>;
const PageB = () => <h1>PageB</h1>;

describe("pageTransitionSupport", function() {
  let scratch, mount;

  beforeEach(function() {
    scratch = document.createElement("div");
    mount = (jsx, prevNode = null) => {
      return render(jsx, scratch, prevNode);
    };

    history.action = "PUSH";
    this.startingPage = mount(<Router><PageA /></Router>);
  });

  afterEach(function() {
    scratch.innerHtml = "";
  });

  describe("moving to a new page", function() {
    it("wraps incoming and outgoing pages in transition containers", function() {
      const nextPage = mount(<Router><PageB /></Router>, this.startingPage);

      expect(nextPage.outerHTML).to.contain(
        mount(
          <div>
            <div class="animated slide in"><h1>PageB</h1></div>
            <div class="animated slide out"><h1>PageA</h1></div>
          </div>
        ).outerHTML
      );
    });

    context("given a 'transition' route prop", function() {
      it("uses that as transition animation instead of default 'slide'", function() {
        const nextPage = mount(
          <Router><PageB transition="foobar" /></Router>,
          this.startingPage
        );

        expect(nextPage.outerHTML).to.contain(
          mount(
            <div>
              <div class="animated foobar in"><h1>PageB</h1></div>
              <div class="animated foobar out"><h1>PageA</h1></div>
            </div>
          ).outerHTML
        );
      });
    });
  });

  context("moving back to a previous page", function() {
    beforeEach(function() {
      this.currentPage = mount(<Router><PageB /></Router>, this.startingPage);
      history.action = "POP";
    });

    it("plays animation of previous page in reverse", function() {
      const nextPage = mount(<Router><PageA /></Router>, this.currentPage);

      expect(nextPage.outerHTML).to.contain(
        mount(
          <div>
            <div class="animated slide in reverse"><h1>PageA</h1></div>
            <div class="animated slide out reverse"><h1>PageB</h1></div>
          </div>
        ).outerHTML
      );
    });
  });
});
