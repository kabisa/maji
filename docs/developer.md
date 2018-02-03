# Maji developer docs

### Publish packages

The Maji repo is managed by [Lerna](https://github.com/lerna/lerna). Currently it consists of two packages:

* The main `maji` package. This contains both build tooling as well as a frontend library.
* The `create-maji-app` package. This contains a Yeoman generator to setup new projects.

Both packages are versioned in fixed mode, meaning they have the exact same versions and are always published together.

To publish a new version run `yarn lerna publish` from the root of the repository.