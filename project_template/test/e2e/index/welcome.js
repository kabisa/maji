module.exports = {
  "Shows welcome message": function(browser) {
    browser
      .url(browser.launch_url)
      .waitForElementVisible("div")
      .assert.title("<$= appName $>")
      .assert.containsText("p", "Welcome to your Maji app!")
      .end();
  },
  "Shows interactive counter": function(browser) {
    const counterAt = value => ["counter p", `Counter is at ${value}`];

    browser
      .url(browser.launch_url)
      .waitForElementVisible("counter")
      .assert.containsText(...counterAt(0))
      .click("counter button:first-of-type")
      .assert.containsText(...counterAt(1))
      .click("counter button:last-of-type")
      .assert.containsText(...counterAt(0))
      .end();
  }
};
