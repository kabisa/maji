require 'capybara/poltergeist'
require 'capybara'

# Requires supporting ruby files with custom matchers and macros, etc,
# in spec/support/ and its subdirectories.
Dir[File.join(File.dirname(__FILE__), 'support/**/*.rb')].each { |f| require f }

RSpec.configure do |config|
  config.include Capybara::DSL
  config.order = 'random'
end

Capybara.default_driver = :poltergeist

if ENV['PRE_BUILT']
  # Make sure our app is built
  system('make dist')
  Capybara.app = Rack::File.new('dist/')
else
  Capybara.app_host = 'http://localhost:9090/'
end
