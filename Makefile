export SHELL   := $(shell echo $$SHELL)
export PATH    := $(PATH):$(shell npm bin)

build:
	coffee --output lib --compile src

watch:
	coffee --watch --output lib --compile src

.PHONY: build
