#!/usr/bin/env bash
set -e
command -v yarn >/dev/null || (echo "Yarn package manager not found in \$PATH, aborting." && exit 1)

echo -e "Welcome to the Maji installer. This script will help you setup your new Maji project.\n"

while [[ -z "$APP_PACKAGE" ]]
do
  read -p "Enter a package name (e.g. org.example.myproject): " APP_PACKAGE
done

while [[ -z "$APP_PATH" ]]
do
  read -p "Enter a directory (e.g. ./Code/myproject): " APP_PATH
done

TMP_DIR=$(mktemp -d 2>/dev/null || mktemp -d -t maji)

pushd "$TMP_DIR" >/dev/null 2>&1
  yarn add --silent maji --no-lockfile --prod
  ./node_modules/.bin/maji new "$APP_PACKAGE" "$APP_PATH"
  RESULT=$?
popd >/dev/null 2>&1

rm -r $TMP_DIR
exit $RESULT
