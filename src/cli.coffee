spawn = require('child_process').spawn
path  = require('path')
maji_package = require('../package.json')

parseBoolean = (value) ->
  value == 'true'

parsePort = (value) ->
  parseInt(value) || null

program = require('commander')
program.version(maji_package.version)

runNpm = (args, env_args = {}) ->
  runCmd('npm', [args..., '--silent'], env_args)

runCmd = (cmd, args, env_args = {}) ->
  env = Object.create(process.env)
  Object.assign(env, env_args)

  child = spawn(cmd, args, { env: env, stdio: 'inherit' })

  child.stdout?.on 'data', (data) ->
    process.stdout.write(data)

  child.stderr?.on 'data', (data) ->
    process.stderr.write(data.toString())

  child.on 'exit', (exitCode) ->
    process.exit(exitCode)

runScript = (scriptName, args, env_args = {}) ->
  runCmd(path.resolve(__dirname + "/../script/#{scriptName}"), args, env_args)

literalArgs = ->
  # commander.js program.args is broken for this purpose
  # https://github.com/tj/commander.js/issues/582
  if program.rawArgs.indexOf('--') == -1
    []
  else
    program.rawArgs.slice(program.rawArgs.indexOf('--') + 1)

program
  .command('new <package_name> <path>')
  .description('Create a new Maji app')
  .on '--help', ->
    console.log '  Example:\n  maji new org.example.my-app ~/Code/my-app'
  .action (packageName, path) ->
    if ! packageName.match /.*\..*\..*/
      console.log 'Please specify a valid package name, for example org.example.my-app'
      process.exit(1)
    runScript('create-project', [packageName, path])

program
  .command('run <platform>')
  .description('Build and run a native app for the specified platform')
  .option('-e, --emulator', 'run on emulator instead of an actual device')
  .option('--env --environment [environment]', 'APP_ENV to run with [development]')
  .action (platform, options) ->
    app_env = options.environment || process.env.APP_ENV || 'development'
    env = {
      'APP_ENV': app_env
    }

    deviceTypeArg = if options.emulator then '--emulator' else '--device'
    runScript('run-on-device', [platform, deviceTypeArg, literalArgs()...], env)

program
  .command('build [platform]')
  .description('Build a native app for the specified platform')
  .option('--release', 'create a release build')
  .option('--env --environment [environment]', 'APP_ENV to build with [production]')
  .action (platform, options) ->
    app_env = options.environment || process.env.APP_ENV || 'production'
    env = {
      'APP_ENV': app_env
    }

    if platform
      releaseArg = if options.release then '--release' else '--debug'
      runScript('build-app', [platform, releaseArg, literalArgs()...], env)
    else
      runNpm(['run', 'build'], env)

program
  .command('test')
  .option('--watch', 'Run tests when project files change')
  .option('--unit', 'Run unit tests')
  .option('--integration', 'Run integration tests')
  .description('Run your project tests')
  .action (options) ->
    if options.watch
      return runNpm(['run', 'test:watch'])

    if options.unit
      return runNpm(['run', 'test:unit'])

    if options.integration
      return runNpm(['run', 'test:integration'])

    runNpm(['test'])

program
  .command('start')
  .description('Run the maji dev server and compile changes on the fly')
  .option('-p --port [port]', 'Port to listen on [9090]', parsePort, 9090)
  .option('-l --livereload [flag]', 'Enable livereload [false]', parseBoolean, false)
  .action (options) ->
    env = {
      'SERVER_PORT': options.port,
      'LIVERELOAD': options.livereload
    }

    runNpm(['start'], env)

program.on '--help', ->
  process.exit(1)

program.on '*', (action) ->
  console.log "Unknown command '#{action}'"
  program.help()

program.parse(process.argv)
program.help() unless process.argv.slice(2).length
