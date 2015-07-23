Wreqr = require('backbone.wreqr')

commands = new Wreqr.Commands()
vent     = new Wreqr.EventAggregator()
reqres   = new Wreqr.RequestResponse()

module.exports =
  commands : commands
  vent     : vent
  reqres   : reqres
  execute  : -> commands.execute.apply(commands, arguments)
  request  : -> reqres.request.apply(reqres, arguments)
  trigger  : -> vent.trigger.apply(vent, arguments)
