import { h, render, Component } from "preact";
import { augmentRouter } from "../src/pageTransitionSupport";
import createHistory from "history/createHashHistory";

const history = createHistory();

class FakeRouter extends Component {
  render({ children }) {
    return children;
  }
}

const Router = augmentRouter(FakeRouter, history);

const pageSpy = sinon.spy();
const withSpy = (componentName, TargetComponent) =>
  class extends Component {
    componentWillMount() {
      pageSpy("mount", componentName);
    }

    render(props) {
      return <TargetComponent {...props} />;
    }
  };

const PageA = withSpy("PageA", () => <h1>PageA</h1>);
const PageB = withSpy("PageB", () => <h1>PageB</h1>);

describe("pageTransitionSupport", function() {
  let scratch, mount;

  beforeEach(function() {
    pageSpy.reset();
    scratch = document.createElement("div");
    mount = (jsx, prevNode = null) => {
      return render(jsx, scratch, prevNode);
    };

    history.action = "PUSH";
    this.startingPage = mount(
      <Router>
        <PageA url="/a" />
      </Router>
    );
  });

  afterEach(function() {
    scratch.innerHtml = "";
  });

  describe("moving to a new page", function() {
    it("wraps incoming and outgoing pages in transition containers", function() {
      const nextPage = mount(
        <Router>
          <PageB url="/b" />
        </Router>,
        this.startingPage
      );

      expect(nextPage.outerHTML).to.contain(
        mount(
          <div class="maji-page-container">
            <div class="maji-page-animating maji-page-animation-slide maji-page-incoming">
              <h1>PageB</h1>
            </div>
            <div class="maji-page-animating maji-page-animation-slide maji-page-outgoing">
              <h1>PageA</h1>
            </div>
          </div>
        ).outerHTML
      );
    });

    it("prevents re-mounting the outgoing page as it's moved in the DOM", function() {
      mount(
        <Router>
          <PageB url="/b" />
        </Router>,
        this.startingPage
      );

      expect(pageSpy.withArgs("mount", "PageA")).to.have.been.calledOnce;
      expect(pageSpy.withArgs("mount", "PageB")).to.have.been.calledOnce;
    });

    context("given a 'transition' route prop", function() {
      it("uses that as transition animation instead of default 'slide'", function() {
        const nextPage = mount(
          <Router>
            <PageB url="/b" transition="foobar" />
          </Router>,
          this.startingPage
        );

        expect(nextPage.outerHTML).to.contain(
          mount(
            <div class="maji-page-container">
              <div class="maji-page-animating maji-page-animation-foobar maji-page-incoming">
                <h1>PageB</h1>
              </div>
              <div class="maji-page-animating maji-page-animation-foobar maji-page-outgoing">
                <h1>PageA</h1>
              </div>
            </div>
          ).outerHTML
        );
      });
    });

    context("given the same URL as previous page", function() {
      it("prevents the transition", function() {
        const nextPage = mount(
          <Router>
            <PageA url="/a" />
          </Router>,
          this.startingPage
        );

        expect(nextPage.querySelector(".maji-page-animating")).to.be.null;
      });
    });

    context("given the same component kind as previous page", function() {
      it("still performs the transition", function() {
        const nextPage = mount(
          <Router>
            <PageA url="/someOtherUrl" />
          </Router>,
          this.startingPage
        );

        expect(nextPage.querySelector(".maji-page-animating")).not.to.be.null;
      });
    });
  });

  context("moving back to a previous page", function() {
    beforeEach(function() {
      this.currentPage = mount(
        <Router>
          <PageB url="/b" />
        </Router>,
        this.startingPage
      );
      history.action = "POP";
    });

    it("plays animations in reverse", function() {
      const nextPage = mount(
        <Router>
          <PageA url="/a" />
        </Router>,
        this.currentPage
      );

      const pages = nextPage.querySelectorAll(
        ".maji-page-animating.maji-page-reverse"
      );

      expect(pages.length).to.eql(2);
    });
  });
});
