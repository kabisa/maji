export DIST_DIR        ?= ./dist
export SHELL           := /bin/bash -e -o pipefail
export PATH            := $(PATH):$(shell npm bin)
export APP_ENV         ?=development
SERVER_PORT            ?= 9090
BROWSERIFY_BASE_CONFIG = \
	-t coffeeify \
	-t aliasify \
	-t yamlify \
	-t [ haml-coffee-browserify ] \
	-t [ envify purge ] \
	-t brfs \
	--extension .hamlc --extension .coffee

dist: clean build-statics build-js build-icons build-css revhash

production:
	APP_ENV=production make build

build-statics:
	cp -R public/* $(DIST_DIR)/
	[ '$(LIVERELOAD)' = 'true' ] && node script/inject-livereload.js '$(DIST_DIR)/index.html' || exit 0

revhash:
	source bin/_functions ; HASH=$$(cat $(DIST_DIR)/assets/app.js | _md5) && \
	mv $(DIST_DIR)/assets/app.js $(DIST_DIR)/assets/app-$$HASH.js && \
	perl -i -pe s/app.js/app-$$HASH.js/ dist/index.html

	source bin/_functions ; HASH=$$(cat $(DIST_DIR)/assets/app.css | _md5) && \
	mv $(DIST_DIR)/assets/app.css $(DIST_DIR)/assets/app-$$HASH.css && \
	perl -i -pe s/app.css/app-$$HASH.css/ dist/index.html

build-js:
	browserify -g uglifyify $(BROWSERIFY_BASE_CONFIG) --debug \
		app/application.coffee | exorcist $(DIST_DIR)/assets/app.js.map | sed '/^\s*$$/d' > $(DIST_DIR)/assets/app.js

build-css:
	node-sass --stdout --output-style $${CSS_OUTPUT_STYLE:-compressed} --include-path vendor/styles app/styles/application.scss | postcss --use autoprefixer --autoprefixer.browsers 'ios >= 8, android >= 4, ie >=10' > $(DIST_DIR)/assets/app.css

build-icons:
	DIST_DIR='$(DIST_DIR)' node script/build-iconfont.js

livereload:
	[ -n "$$LIVERELOAD" ] && ((sleep 5 && node script/livereload.js '$(DIST_DIR)/**/*') &) || exit 0

check-server-port:
	@nc -z 127.0.0.1 $(SERVER_PORT) >/dev/null && echo 'Port $(SERVER_PORT) occupied, is a server already running?' && exit 1 || exit 0

serve: DIST_DIR := './tmp/watch-build'
serve: check-server-port clean build-statics build-icons build-css livereload
	onchange 'public/**/*' -- make build-statics &
	CSS_OUTPUT_STYLE=expanded onchange 'app/styles/**/*.scss' -- make build-css &
	onchange 'app/styles/icons/*.svg' -- make build-icons &
	watchify -d -v $(BROWSERIFY_BASE_CONFIG) -x bugsnag-js \
	 app/application.coffee -o $(DIST_DIR)/assets/app.js &
	sleep 2 && http-server -p $(SERVER_PORT) $(DIST_DIR)

watch: serve

test:
	bin/ci

clean:
	rm -rf $(DIST_DIR) && mkdir -p $(DIST_DIR)/assets

.PHONY: clean build-statics build-js build-css build-icons serve watch
.SILENT: serve revhash
