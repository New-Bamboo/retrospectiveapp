require 'rubygems'
require 'sinatra'
require 'rackjson'
require 'rack_push'
 
set :run, false
set :environment, ENV['RACK_ENV']
  
require 'app'
expose_resource :collections => [:boards], :db => Mongo::Connection.new.db("retrospectiveapp")
use Rack::Push::App, :key => '8ebcdcaa1f1cee3ff93e', :app_id => '19', :secret => '05f9c3f0185f6045147a'
run Sinatra::Application
