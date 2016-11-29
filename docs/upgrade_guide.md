# Upgrade guide 1.1.0 -> 1.x.x

In version 1.x.x the Marionette dependency has been updated to 3.1.0.
This means that your app has to update from Marionette 2.4.4 to 3.1.0

Marionatte has an [upgrade guide available online](http://marionettejs.com/docs/v3.1.0/upgrade.html).

The best way to start is to checkout the updated example app.

1. Update `app/application.coffee` You can probably look up the example app version

2. Update `app/app.coffee`:

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
   app.on 'start', (options) ->
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
   
   Update the implementation of the bus functions:
   
   ```coffee
   app.bus.reqres.setHandler 'view:current', ->
    app.getView()

   app.bus.reqres.setHandler 'uri:current', ->
     Backbone.history.fragment

   app.bus.commands.setHandler 'navigate', (location, options = {}) ->
     app.getRegion().navigate(location, options, Backbone.history)

   app.bus.commands.setHandler 'go-back', (where, opts) ->
     where = undefined if where == '#'
     app.getRegion().goBack(where, opts)
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

With these steps your app should become functional again, depending on how much custom stuff your app uses (like overwriting private implementations of Marionette).