#### Gem dependencies

require 'rubygems'
require 'sinatra'
require 'haml'
require 'pusher'

get '/' do
  haml :index
end

#### CSS Routes

get '/reset.css' do
  content_type 'text/css', :charset => 'utf-8'
  sass :reset
end

get '/app.css' do
  content_type 'text/css', :charset => 'utf-8'
  sass :app
end