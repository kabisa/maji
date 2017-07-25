module.exports = {
  env: {
    browser: true,
    es6: true,
    commonjs: true
  },
  globals: {
    process: true,
    __VERSION_NUMBER__: true,
    __BUILD_IDENTIFIER__: true
  },
  plugins: ["compat", "prettier", "react"],
  extends: ["eslint:recommended", "plugin:react/recommended"],
  parser: "babel-eslint",
  parserOptions: {
    sourceType: "module",
    ecmaFeatures: {
      jsx: true,
      modules: true,
      experimentalObjectRestSpread: true
    }
  },
  settings: {
    react: {
      pragma: "h"
    }
  },
  rules: {
    "prettier/prettier": "error",
    "compat/compat": "error",
    "react/no-unknown-property": ["error", { ignore: ["class"] }],
    "react/prop-types": "off",
    "react/display-name": "off"
  }
};
