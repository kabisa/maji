export SHELL           := /usr/bin/env bash -e -o pipefail
export PATH            := $(PATH):$(shell npm bin)
export APP_ENV         ?=development
DIST_DIR               := ./dist
BUILD_DIR              ?= ./tmp/build
WATCH_BUILD_DIR        := ./tmp/watch-build
JS_BUNDLE_MAIN         := app/application.coffee

WEBPACK_FILES       := $(shell find app -name '*.coffee' -o -name '*.hamlc' -o -name '*.yml' -o -name '*.json')
SCSS_FILES          := $(shell find app/styles -name '*.scss')
PUBLIC_FILES        := $(shell find public -type f)
ICON_FILES          := $(shell find app/styles/icons -name '*.svg')
ICON_FILES_TARGET   := $(patsubst %, $(BUILD_DIR)/assets/fonts/icons.%, woff eot ttf)
PUBLIC_FILES_TARGET := $(PUBLIC_FILES:public/%=$(BUILD_DIR)/%)
ALL_TARGETS         := $(BUILD_DIR)/assets/app.js \
	$(ICON_FILES_TARGET) \
	$(BUILD_DIR)/assets/app.css \
	$(PUBLIC_FILES_TARGET)

dist: check-env $(ALL_TARGETS) copy-to-dist

$(BUILD_DIR)/assets/app.js: $(WEBPACK_FILES)
	@echo Compiling js
	@mkdir -p $(@D)
	@webpack --hide-modules --output-path $(BUILD_DIR)/assets/

$(BUILD_DIR)/assets/app.css: $(SCSS_FILES) $(ICON_FILES)
	@echo Compiling sass
	@mkdir -p $(@D)
	@node-sass --stdout --output-style $${CSS_OUTPUT_STYLE:-compressed} --include-path vendor/styles app/styles/application.scss | postcss --use autoprefixer --autoprefixer.browsers 'ios >= 8, android >= 4, ie >=10' > $(BUILD_DIR)/assets/app.css

$(ICON_FILES_TARGET): $(ICON_FILES)
	@echo Building icon font
	@DIST_DIR='$(BUILD_DIR)' node script/build-iconfont.js

$(BUILD_DIR)/%: public/%
	@echo "Copying $<"
	@mkdir -p $(@D)
	@cp "$<" "$@"

copy-to-dist:
	@echo Copying to $(DIST_DIR)
	@rm -rf $(DIST_DIR)/*
	@mkdir -p $(DIST_DIR)
	@cp -R $(BUILD_DIR)/* $(DIST_DIR)

	@source bin/_functions ; HASH=$$(cat $(DIST_DIR)/assets/app.js | _md5) && \
		mv $(DIST_DIR)/assets/app.js $(DIST_DIR)/assets/app-$$HASH.js && \
		perl -i -pe s/app.js/app-$$HASH.js/ $(DIST_DIR)/index.html

	@source bin/_functions ; HASH=$$(cat $(DIST_DIR)/assets/app.css | _md5) && \
		mv $(DIST_DIR)/assets/app.css $(DIST_DIR)/assets/app-$$HASH.css && \
		perl -i -pe s/app.css/app-$$HASH.css/ $(DIST_DIR)/index.html

clean:
	@rm -rf $(BUILD_DIR)
	@rm -rf $(WATCH_BUILD_DIR)

test:
	bin/ci

check-env:
	@# check if we previously build with a different APP_ENV. If the APP_ENV has changed
	@# we need to recompile
	@[ "$$(cat tmp/.build-env 2>/dev/null)" == "$(APP_ENV)" ] || (echo '$(APP_ENV)' > tmp/.build-env && touch $(JS_BUNDLE_MAIN))
	@echo Building with APP_ENV = $(APP_ENV)

watch:
	@BUILD_DIR=$(WATCH_BUILD_DIR) $(MAKE) doWatch

doWatch: check-env $(ALL_TARGETS)
	@onchange 'public/**/*' -- $(MAKE) BUILD_DIR="$(WATCH_BUILD_DIR)" FILE='{{changed}}' copy-watched-file &
	@CSS_OUTPUT_STYLE=expanded onchange 'app/styles/**/*.scss' -- $(MAKE) $(BUILD_DIR)/assets/app.css &
	@onchange 'app/styles/icons/*.svg' -- $(MAKE) -s $(BUILD_DIR)/assets/fonts/icons.eot &
	@webpack --output-path $(BUILD_DIR)/assets/ --watch &
	@sleep 2 && maji-dev-server $(BUILD_DIR) --port=$(SERVER_PORT) --livereload=$(LIVERELOAD)


copy-watched-file: $(FILE:public/%=$(BUILD_DIR)/%)

.PHONY: clean dist test check-env copy-to-dist watch doWatch copy-watched-file
