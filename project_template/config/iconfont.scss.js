@font-face {
  font-family: '<%= fontName %>';
  src: url('<%= fontPath + fontName %>.eot');
  src: url('<%= fontPath + fontName %>.eot?#iefix') format('eot'),
    url('<%= fontPath + fontName %>.woff') format('woff'),
    url('<%= fontPath + fontName %>.ttf') format('truetype'),
    url('<%= fontPath + fontName %>.svg#<%= fontName %>') format('svg');
}

%icon {
  font-family: '<%= fontName %>';
  font-smoothing: antialiased;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  font-style: normal;
  font-variant: normal;
  font-weight: normal;
  text-decoration: none;
  text-transform: none;
  text-rendering: auto;
}

@function icon-char($filename) {
  $char: '';
<% _.each(glyphs, function(glyph) { %>
  @if $filename == <%= glyph.fileName %> {
    $char: '\<%= glyph.codePoint %>';
  }<% }); %>

  @return $char;
}

@mixin icon($filename, $insert: before) {
  &:#{$insert} {
    @extend %icon;
    content: icon-char($filename);
  }
}

<% _.each(glyphs, function(glyph) { %>%icon-<%= glyph.fileName %> {
  @include icon(<%= glyph.fileName %>);
}

<% }); %>
