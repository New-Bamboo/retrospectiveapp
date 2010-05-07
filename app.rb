#### Gem dependencies

require 'rubygems'
require 'sinatra'
require 'haml'
require 'pusher'
Pusher.key = 'c9f08e8c50f6f0cfb136'
PUSHER_CHANNEL = 'retrospectiveapp-' + Sinatra::Application.environment.to_s

get '/' do
  haml :index
end

put '/notes/:id/softupdate.json' do
  content_type 'text/json', :charset => 'utf-8'
  Pusher[PUSHER_CHANNEL].trigger('note-softupdate', params[:note].to_json, params[:socket_id])
  params[:note].to_json
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