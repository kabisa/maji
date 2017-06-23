module.exports = {
  "Displays welcome message": function(browser) {
    browser
      .url("http://localhost:9091/") // TODO: this base url should get injected from some place
      .waitForElementVisible("div", 50000)
      .assert.title("my-app")
      .assert.containsText("p", "Welcome to your Maji app!")
      .end();
  }
};
