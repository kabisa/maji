spawn = require('child_process').spawn
path  = require('path')

program = require('commander')
program.version('1.0.0')

executeScript = (scriptName, args) ->
  child = spawn(path.resolve(__dirname + "/../script/#{scriptName}"), args)

  child.stdout.on 'data', (data) ->
    process.stdout.write(data)

  child.stderr.on 'data', (data) ->
    process.stderr.write(data.toString())

  child.on 'exit', (exitCode) ->
    process.exit(exitCode)

program
  .command('run <platform>')
  .description('build and run a native app for the specified platform')
  .option('-e, --emulator', 'run on emulator instead of an actual device')
  .action (platform, options) ->
    deviceTypeArg = if options.emulator then '--emulator' else '--device'
    executeScript('run-on-device', [platform, deviceTypeArg])

program
  .command('build <platform>')
  .description('build a native app for the specified platform')
  .option('--release', 'create a release build')
  .action (platform, options) ->
    releaseArg = if options.release then '--release' else '--debug'
    executeScript('build-app', [platform, releaseArg])

program
  .command('new <package_name> <path>')
  .description('create a new Maji app')
  .on '--help', ->
    console.log '  Example:\n  maji new org.example.my-app ~/Code/my-app'
  .action (packageName, path) ->
    if ! packageName.match /.*\..*\..*/
      console.log 'Please specify a valid package name, for example org.example.my-app'
      process.exit(1)
    executeScript('create-project', [packageName, path])

program.on '--help', ->
  process.exit(1)

program.parse(process.argv)
program.help() unless process.argv.slice(2).length
