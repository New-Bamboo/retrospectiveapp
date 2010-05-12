require 'rubygems'
require 'sinatra'
require 'rackjson'
 
set :run, false
set :environment, ENV['RACK_ENV']
  
require 'app'
expose_resource :collections => [:boards], :db => Mongo::Connection.new.db("retrospectiveapp")
run Sinatra::Application
