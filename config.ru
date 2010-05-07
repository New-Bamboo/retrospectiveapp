require 'rubygems'
require 'sinatra'
require 'rackjson'
 
set :run, false
set :environment, ENV['RACK_ENV']
  
require 'app'
use Rack::JSON::Resource, :collections => [:notes], :db => Mongo::Connection.new.db("retrospectiveapp")
run Sinatra::Application
