export DIST_DIR        ?= ./dist
export SHELL           := /bin/bash -e -o pipefail
export PATH            := $(PATH):$(shell npm bin)
export APP_ENV         ?=development

dist: clean build-statics build-js build-icons build-css revhash

production:
	APP_ENV=production make build

build-statics:
	cp -R public/* $(DIST_DIR)/

revhash:
	source bin/_functions ; HASH=$$(cat $(DIST_DIR)/assets/app.js | _md5) && \
	mv $(DIST_DIR)/assets/app.js $(DIST_DIR)/assets/app-$$HASH.js && \
	perl -i -pe s/app.js/app-$$HASH.js/ dist/index.html

	source bin/_functions ; HASH=$$(cat $(DIST_DIR)/assets/app.css | _md5) && \
	mv $(DIST_DIR)/assets/app.css $(DIST_DIR)/assets/app-$$HASH.css && \
	perl -i -pe s/app.css/app-$$HASH.css/ dist/index.html

build-js:
	webpack --output-path $(DIST_DIR)/assets/

build-css:
	node-sass --stdout --output-style $${CSS_OUTPUT_STYLE:-compressed} --include-path vendor/styles app/styles/application.scss | postcss --use autoprefixer --autoprefixer.browsers 'ios >= 8, android >= 4, ie >=10' > $(DIST_DIR)/assets/app.css

build-icons:
	DIST_DIR='$(DIST_DIR)' node script/build-iconfont.js

serve: DIST_DIR := './tmp/watch-build'
serve: clean build-statics build-icons build-css
	onchange 'public/**/*' -- make build-statics &
	CSS_OUTPUT_STYLE=expanded onchange 'app/styles/**/*.scss' -- make build-css &
	onchange 'app/styles/icons/*.svg' -- make build-icons &
	webpack --output-path $(DIST_DIR)/assets/ --watch &
	sleep 2 && maji-dev-server $(DIST_DIR) --port=$(SERVER_PORT) --livereload=$(LIVERELOAD)

watch: serve

test:
	bin/ci

clean:
	rm -rf $(DIST_DIR) && mkdir -p $(DIST_DIR)/assets

.PHONY: clean build-statics build-js build-css build-icons serve watch
.SILENT: serve revhash
