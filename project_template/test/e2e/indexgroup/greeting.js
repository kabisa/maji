module.exports = {
  "Displays welcome message": function(browser) {
    browser
      .url(browser.launch_url)
      .waitForElementVisible("div")
      .assert.title("my-app")
      .assert.containsText("p", "Welcome to your Maji app!")
      .end();
  }
};
