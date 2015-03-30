# Maji Mobile

## About

![Maji Mobile](img/maji-mobile-logo.png)

Maji Mobile is a mobile platform development solution, that allows you to quickly create mobile applications for any platform, using web technologies.
It allows any (Web-)developer to quickly start developing mobile applications for any mobile platform.

Maji Mobile is not a framework on itself; it generates a ready-to-go project that utilises several frameworks and custom scripts to allow building and running on mobile platforms.
Find sources in `src/`. Compiled javascript is stored in `lib/` and included
in the repository so this module can be used straight from Github and without
needing the application using it to compile it's sources to javascript first.

## Getting started

To create a new app execute the following commands in your shell:

```
$ npm install git+ssh://git@github.com:kabisaict/maji
$ ./node_modules/.bin/maji new org.example.my-app /desired/path/to/your/project/
```

Your new Maji app will now be generated at the supplied path.
To start your app `cd` into it's directory, execute `make watch` and navigate to http://localhost:9090/ with your browser.
