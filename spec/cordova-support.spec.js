window.cordova = { platformId: "web" };
import registerCordovaSupport from "../src/cordova-support";

registerCordovaSupport();

describe("CordovaSupport", () => {
  it("adds a class on document.body indicating cordova platformId", () => {
    expect(document.body).to.have.class("platform-web");
  });
});
