const {
  ensureDirSync,
  readJsonSync,
  writeJsonSync,
  pathExistsSync
} = require("fs-extra");
const { symlinkSync } = require("fs");
const { resolve, dirname, relative } = require("path");
const { sync: commandExistsSync } = require("command-exists");
const Generator = require("yeoman-generator");

const supportsGit = commandExistsSync("git");
const supportsYarn = commandExistsSync("yarnpkg");
const installer = supportsYarn ? "yarn" : "npm";

const majiVersion =
  process.env.MAJI_VERSION || require("./package.json").version;

module.exports = class extends Generator {
  constructor(args, opts) {
    super(args, opts);
    this.installDependencies = supportsYarn
      ? this.yarnInstall
      : this.npmInstall;

    this.appName = this.options.package.split(".").slice(-1)[0];
    this.gitRepoExists = pathExistsSync(this.destinationPath(".git"));
  }

  paths() {
    this.destinationRoot(this.options.directory);
  }

  writing() {
    ensureDirSync(this.destinationPath());

    const templateContext = {
      appName: this.appName,
      appPackage: this.options.package
    };

    this.fs.copyTpl(
      this.templatePath("**/{.,}*"),
      this.destinationPath(),
      templateContext,
      { delimiter: "$" },
      {
        globOptions: {
          ignore: [
            this.templatePath("gitignore"),
            this.templatePath("package.json")
          ]
        }
      }
    );

    this.fs.copy(
      this.templatePath("gitignore"),
      this.destinationPath(".gitignore")
    );

    const jsonPath = this.templatePath("package.json");
    const packageJson = readJsonSync(jsonPath);

    packageJson.name = this.appName;
    packageJson.dependencies["maji"] = majiVersion;

    writeJsonSync(this.destinationPath("package.json"), packageJson, {
      spaces: 2
    });

    if (supportsGit && !this.gitRepoExists) {
      this.spawnCommandSync("git", ["init", "--quiet"]);
    }

    this.installDependencies();
  }

  end() {
    symlinkSync(
      relative(this.destinationPath("cordova"), this.destinationPath("dist")),
      this.destinationPath("cordova", "www"),
      "dir"
    );
    symlinkSync(
      relative(
        this.destinationPath("bin"),
        this.destinationPath("node_modules", ".bin", "maji")
      ),
      this.destinationPath("bin", "maji"),
      "file"
    );

    if (supportsGit && !this.gitRepoExists) {
      this.spawnCommandSync("git", ["add", "--all"]);
      this.spawnCommandSync("git", [
        "commit",
        "-m",
        "Initial commit - new Maji project.",
        "--quiet",
        "--no-verify"
      ]);
    }
  }
};
