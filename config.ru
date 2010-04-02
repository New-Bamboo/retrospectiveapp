require 'rubygems'
require 'sinatra'
 
set :run, false
set :environment, ENV['RACK_ENV']
  
require 'app'
run Sinatra::Application
