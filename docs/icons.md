# Using icons in your app

Maji comes with an iconfont generator built-in. Simply drop SVG icons into the `app/styles/icons/` directory and the icon will be added to the iconfont.

Iconfonts have the advantage to work on all major platforms, even Android 2.3. Iconfonts can easily be scaled and colored using css.

Icons can be used from Sass using the `icon` mixin. Given an icon named `loader.svg` you could include this icon using `@include icon(loader)`.

## Preparing SVG's

For optimal results make sure to save your SVG as follows:

### Illustrator

Save your file as SVG with the following settings:

- SVG Profiles: SVG 1.1
- Fonts Type: SVG
- Fonts Subsetting: None
- Options Image Location: Embed
- Advanced Options
  - CSS Properties: Presentation Attributes
  - Decimal Places: 1
  - Encoding: UTF-8
  - Output fewer <tspan> elements: check

Leave the rest unchecked.

More in-depth information: [http://www.adobe.com/inspire/2013/09/exporting-svg-illustrator.html](http://www.adobe.com/inspire/2013/09/exporting-svg-illustrator.html)
