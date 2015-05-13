# Maji FAQ

## What is Maji Mobile?

Maji Mobile is a mobile platform development solution, that allows you to quickly create mobile applications for any platform, using web technologies.

It is *not* a framework itself, it is an opinionated combination of tools, frameworks and technologies, combined with custom scripts to make it all work together.

## What's up with that name?

Maji is Swahili for 'water'. We choose this name as Maji Mobile is flexible, it has to adapt to the situation, just like water flows to match the surroundings.

What do we have with Swahili? Maji Mobile originated from a [Kabisa](http://www.kabisa.nl) project. Kabisa is a Dutch company, but its name is also a Swahili word.

## What knowledge do I need to build apps with Maji?

When you are developing apps with Maji you will be making Web Apps that are packaged into a Cordova wrapper, so you will need to know how to build web apps.
To be specific, aside from HTML 5 / CSS3 / JavasScript, you need to know how to build apps with [BackboneJS](http://backbonejs.org) (and [MarionetteJS](http://marionettejs.com)). To use mobile specific features, you need to know how to use [Apache Cordova](http://cordova.apache.org) Plugins.

That's it! Maji will take care of the rest.

## What platforms does Maji support?

Maji Mobile uses Apache Cordova to build native app binaries and thus supports any OS supported by Cordova like iOS, Android, Windows Phone and others.
Please see the [Apache Cordova Platform Guide](http://cordova.apache.org/docs/en/4.0.0/guide_support_index.md.html#Platform%20Support) for exact details.

## Why \<insert component here\>?
We have tried countless of other frameworks and tools, but found the tools in Maji Mobile are those we liked the most. It fits our style of Test Driven Development, while allowing the flexibility to make any mobile application our customers need.

It's not that we don't like other frameworks or tools, but these work for us. They might work for you, and they might not :)

## Can I use AngularJS / Ember.js with Maji?

Sure, but you'll have to do some plumbing yourself to integrate with the components available in Maji.
When you replace Backbone with another JavaScript front-end framework, you will miss the 'glue' that Maji Mobile provides, like a caching and animated page transitions.

## Can I use native mobile device features like the camera, GPS etc?

Absolutely!

Apache Cordova is easily configurable to create a Mobile Application that uses exactly what you need, by utilising plug-ins.
You can access any mobile device features by adding the corresponding plug-in, either one created by Apache or one of the many plug-ins made by the active community.

See the [Cordova Plugin API](http://docs.phonegap.com/en/4.0.0/cordova_plugins_pluginapis.md.html) for more details.
