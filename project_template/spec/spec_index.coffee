# https://github.com/webpack/karma-webpack#alternative-usage
#
# Without this, karma and webpack don't play nice together since webpack
# will compile a bundle with jquery, marionette etc for each spec file.
#
# With this, all specs are compiled together. Single specs can be run with
# mochas describe.only feature.
testsContext = require.context('.', true, /_spec$/)
testsContext.keys().forEach (path) ->
  try
    testsContext(path)
  catch err
    console.error('[ERROR] WITH SPEC FILE:', path)
    console.error(err)
