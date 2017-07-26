import { welcome } from "src/modules/welcome/reducer";
import {
  COUNTER_INCREMENT,
  COUNTER_DECREMENT
} from "src/modules/welcome/actions";

describe("reducers", function() {
  let sample = { counter: 100 };

  describe("welcome reducer", function() {
    it("sets initial counter to 0", function() {
      expect(welcome(undefined, {})).to.eql({ counter: 0 });
    });

    it("handles COUNTER_INCREMENT action", function() {
      expect(welcome(sample, { type: COUNTER_INCREMENT })).to.eql({
        counter: 101
      });
    });

    it("handles COUNTER_DECREMENT action", function() {
      expect(welcome(sample, { type: COUNTER_DECREMENT })).to.eql({
        counter: 99
      });
    });
  });
});
