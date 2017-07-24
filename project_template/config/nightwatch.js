require("babel-register");

const selenium = require("selenium-server-standalone-jar");
const chromedriver = require("chromedriver");

module.exports = {
  src_folders: ["./test/e2e"],
  output_folder: "reports",
  selenium: {
    start_process: true,
    server_path: selenium.path,
    log_path: "reports",
    cli_args: {
      "webdriver.chrome.driver": chromedriver.path
    }
  },
  test_settings: {
    default: {
      launch_url: `http://localhost:${process.env.PORT || 9091}/`,
      selenium_port: 4444,
      selenium_host: "localhost",
      desiredCapabilities: {
        browserName: "chrome"
      },
      globals: {
        waitForConditionTimeout: 5000
      }
    },
    ci: {
      desiredCapabilities: {
        browserName: "chrome",
        chromeOptions: {
          args: ["--no-sandbox"]
        }
      }
    }
  }
};
