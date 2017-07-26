import { h } from "preact";
import Counter from "src/modules/welcome/components/Counter";
import { shallow } from "preact-render-spy";

describe("Counter", function() {
  it("displays a counter", function() {
    const context = shallow(<Counter value={123} />);
    expect(context.contains(<p>Counter is at 123</p>)).to.be.true;
  });

  context("pressing buttons", function() {
    const renderContext = ({ ...props }) =>
      shallow(<Counter value={0} {...props} />);
    const action = sinon.stub();

    it("calls prop onIncrement when first button is pressed", function() {
      const context = renderContext({ onIncrement: action });
      context.find("button").at(0).simulate("click");

      expect(action).to.have.been.called;
    });

    it("calls prop onDecrement when second button is pressed", function() {
      const context = renderContext({ onDecrement: action });
      context.find("button").at(1).simulate("click");

      expect(action).to.have.been.called;
    });
  });
});
