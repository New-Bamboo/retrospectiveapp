require 'rubygems'
require 'sinatra'
require 'haml'

get '/' do
  haml :index
end

get '/reset.css' do
  content_type 'text/css', :charset => 'utf-8'
  sass :reset
end

get '/app.css' do
  content_type 'text/css', :charset => 'utf-8'
  sass :app
end