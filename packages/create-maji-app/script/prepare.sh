#!/usr/bin/env bash
TEMPLATES_DIR=$(pwd)/templates
[ -e "$TEMPLATES_DIR" ] && rm -r "$TEMPLATES_DIR"
mkdir "$TEMPLATES_DIR"

rsync -av \
  --include=**/.keep \
  --exclude-from=../../project_template/.gitignore \
  ../../project_template/ "$TEMPLATES_DIR/"

# npm packages don't support .gitignore files :(
mv "$TEMPLATES_DIR/.gitignore" "$TEMPLATES_DIR/gitignore"