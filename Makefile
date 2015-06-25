export PATH    := $(shell npm bin):$(PATH)

build:
	coffee --output lib --compile src
	echo '#!/usr/bin/env node' | cat - lib/cli.js > /tmp/cli.js && mv /tmp/cli.js lib/cli.js
	chmod +x lib/cli.js

watch:
	coffee --watch --output lib --compile src

.PHONY: build
