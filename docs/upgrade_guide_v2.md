# Upgrade guide Maji 1.1.0 -> 2.0.0

Maji 2.0 contains several (breaking) changes. Follow the steps outlined in this document to upgrade your app to Maji 2.0.

## MarionetteJS

In Maji 2.0.0 the Marionette dependency has been updated to 3.1.0.

This means that your app has to update from Marionette 2.4.4 to 3.1.0.
The `Maji.bus` (using `backbone.wreqr`) is also removed in favor of using `backbone.radio`.

Marionette has an [upgrade guide available online][marionette-upgrade], which you can use to find more help upgrading after using this guide.

The best way to start is to checkout the updated example app and compare it to your app.

1. Update `app/application.coffee`:
    1. At the top of the file, replace
        ```coffee
        attachFastClick       = require('fastclick')
        ```

        with

        ```coffee
        FastClick = require('fastclick)
        ```

    1. In the method `setTimeout`, replace both instances of
        ```coffee
        app.mainRegion.$el
        ```
        with
        ```coffee
        $(app.getRegion().el)
        ```

2. Update `app/app.coffee`:

   Add in the top of the file:

   ```coffee
   Radio = require('backbone.radio')
   ```

   Change the following:

   ```coffee
   app.addInitializer ->
     require('./modules/home/home_app').start()
   ```

   to:

   ```coffee
   app.on 'before:start', ->
     require('./modules/home/home_app')
   ```

   Change the kickoff of the backbone history:

   ```coffee
   app.on 'initialize:after', (options) ->
     Backbone.history.start()
   ```

   to:

   ```coffee
   app.on 'before:start', (options) ->
     # Bind the start event in after the inclusion of
     # the modules, so that the routers are initialized
     # before the kick-off of the backbone history
       app.on 'start', (options) ->
           Backbone.history.start()
   ```

   Update the implementation of the bus functions to:

   ```coffee
   Radio.channel('app').reply(
     'view:current': -> app.getView()
     'uri:current': -> Backbone.history.fragment
     'navigate': (location, options = {}) ->
       app.getRegion().navigate(location, options, Backbone.history)
     'go-back': (where, opts = {}) ->
       where = undefined if where == '#'
       app.getRegion().goBack(where, opts)
   )
   ```

3. The best approachs is to disable all modules, and enable/update them one by one, starting with the main module 'app' file:

   Change:

   ```coffee
   MyModuleApp = app.module('my_module')
   MyModuleApp.startWithParent = false

   class MyModuleApp.Router extends Marionette.AppRouter
     appRoutes:
       'my_route/:resource_id' : 'openMyRoute'

   API =
     openMyRoute: (resourceId) ->
       app.mainRegion.show new EditorPage(
         model: model
       )

   MyModuleApp.addInitializer ->
     new EditorApp.Router
       controller: API

   module.exports = EditorApp
    ```

   To:

    ```coffee
   # Notice creation of module is gone;
   # New name for router

   class MyModuleRouter extends Marionette.AppRouter
     routes: # previously appRoutes
       'my_route/:resource_id' : 'openMyRoute'

     openMyRoute: (resourceId) -> # Method in class now
       app.showView new EditorPage( # Use showView
         model: model
       )

   app.on 'start', ->
     new MyModuleRouter # No passing of controller

   # No Module exports
    ```

4. Update all your views:

   * everything extending from `Marionette.ItemView` must now extend from `Marionette.View`
   * `onShow` is gone. Use `onAttach` instead
   * Update use of *Regions*. `@myRegion.show new MySubView` is now `@showChildView('myRegion', new MySubView)`
   * `getChildView: ->` is now `childView: ->`


## Cordova plugin management

Maji 2.x uses Cordova plugin management

This means that the Cordova plugins you wish to use should now be defined in `cordova/config.xml`, instead of `cordova/plugins.txt`.

Refer to the Cordova documentation for details: https://cordova.apache.org/docs/en/latest/platform_plugin_versioning_ref/

## Cordova platform management

In Maji 2.0, Maji no longer automatically adds Cordova platforms when you invoke `maji run` or `maji build`. Instead it is expected that you define the platform versions in your `cordova/config.xml` like so:

```xml
<!-- cordova/config.xml -->
<engine name="android" spec="~6.0.0" />
<engine name="ios" spec="~4.3.1" />
```

All projects created with Maji 2.0 are configured like this out of the box.

## Maji bus

Update all uses of the `Maji.bus` to Backbone.Radio ([see documentation of radio here][backbone-radio])

## Switch from Browserify to webpack (optional)

With Maji 2.x new projects use webpack for module bundling. While not required it's recommended that you migrate your projects to webpack, see [this Pull Request](https://github.com/kabisa/maji/pull/128) for reasoning and benefits. This PR can be used as a basis to migrate your project to webpack.

With these steps your app should become functional again, depending on how much custom stuff your app uses (like overwriting private implementations of Marionette).

## Maji CLI

Maji 2.x adds several new subcommands to the Maji CLI, streamlining the development workflow to have a single way to interact with your project:

* `maji start` - starts the development server
* `maji build` - build static assets
* `maji test` - runs your projects tests once
* `maji test --unit` - runs your unit test once
* `maji test --integration` - runs your integration test once
* `maji test --watch` - runs your tests whenever files are changed

All these commands delegate to NPM run scripts. When upgrading from Maji 1.x to Maji 2.x you can add the following snippet to your `package.json` to add support for these commands:

```json
"scripts": {
  "test": "bin/ci",
  "test:unit": "APP_ENV=test karma start --single-run",
  "test:integration": "APP_ENV=test PRE_BUILT=true bundle exec rspec",
  "test:watch": "APP_ENV=test karma start --watch",
  "start": "make watch",
  "build": "make dist"
}
```

Should you choose the use a different test runner for example then the only thing that needs to change are the NPM scripts defined in your `package.json` and everything will continue to work.

[marionette-upgrade]: http://marionettejs.com/docs/v3.1.0/upgrade.html
[backbone-radio]: https://github.com/marionettejs/backbone.radio
