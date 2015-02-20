fs = require('fs')

module.exports = JSON.parse(
  fs.readFileSync(__dirname + "/settings.#{process.env.APP_ENV}.json", 'utf8')
)
