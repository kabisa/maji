COFFEE := $(shell npm bin)/coffee

build:
	$(COFFEE) --output lib --compile src
	echo '#!/usr/bin/env node' | cat - lib/cli.js > /tmp/cli.js && mv /tmp/cli.js lib/cli.js
	chmod +x lib/cli.js

watch:
	$(COFFEE) --watch --output lib --compile src

.PHONY: build
