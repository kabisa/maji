import { h, render } from "preact";
import { WelcomePage } from "src/modules/welcome/containers/WelcomePage";
import Counter from "src/modules/welcome/components/Counter";

describe("WelcomePage", function() {
  let scratch, mount;

  beforeEach(function() {
    scratch = document.createElement("div");
    mount = jsx => render(jsx, scratch);
  });

  afterEach(function() {
    scratch.innerHtml = "";
  });

  it("displays welcome message", function() {
    mount(<WelcomePage />);
    expect(scratch.querySelector("p")).to.have.text(
      "Welcome to your Maji app!"
    );
  });

  it("embeds a counter", function() {
    const page = mount(<WelcomePage counter={123} />);
    expect(page.outerHTML).to.contain(mount(<Counter value={123} />).outerHTML);
  });
});
