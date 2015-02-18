export SHELL   := $(shell echo $$SHELL)
export PATH    := $(PATH):$(shell npm bin)

build:
	coffee --output lib --compile src
	echo '#!/usr/bin/env node' | cat - lib/cli.js > /tmp/cli.js && mv /tmp/cli.js lib/cli.js
	chmod +x lib/cli.js

watch:
	coffee --watch --output lib --compile src

.PHONY: build
