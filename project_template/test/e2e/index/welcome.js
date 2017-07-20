module.exports = {
  "Displays welcome message": function(browser) {
    browser
      .url(browser.launch_url)
      .waitForElementVisible("div")
      .assert.title("##APP_NAME##")
      .assert.containsText("p", "Welcome to your Maji app!")
      .end();
  }
};
