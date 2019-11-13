require("@babel/register");

const selenium = require("selenium-server-standalone-jar");
const chromedriver = require("chromedriver");
const chromePath = require("puppeteer").executablePath();

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
      launch_url: `http://localhost:${process.env.SERVER_PORT || 9091}/`,
      selenium_port: 4444,
      selenium_host: "localhost",
      desiredCapabilities: {
        browserName: "chrome",
        chromeOptions: {
          binary: chromePath,
          args: ["--headless"],
          w3c: false
        }
      },
      globals: {
        waitForConditionTimeout: 5000
      }
    },
    nonHeadless: {
      desiredCapabilities: {
        browserName: "chrome",
        chromeOptions: {
          args: ["--default"],
          w3c: false
        }
      }
    },
    ci: {
      desiredCapabilities: {
        browserName: "chrome",
        chromeOptions: {
          binary: chromePath,
          args: ["--no-sandbox", "--headless"],
          w3c: false
        }
      }
    }
  }
};
