#### Gem dependencies

require 'rubygems'
require 'sinatra'
require 'haml'
require 'dm-core'
require 'dm-serializer'
require 'pusher'

Pusher.app_id = '17'
Pusher.key = 'c9f08e8c50f6f0cfb136'
Pusher.secret = '5eeec6ac0f4da8ad248a'

PUSHER_CHANNEL = 'retrospectiveapp-' + Sinatra::Application.environment.to_s


#### DB Models

class Note
  include DataMapper::Resource

  property :id,         Serial
  property :text,       Text
  property :x,          Integer
  property :y,          Integer
  property :w,          Integer
  property :h,          Integer
  property :color,      String
  property :angle,      Integer
end

#### Configuration

configure :development do
  require 'do_sqlite3'
  DataMapper.setup(:default, "sqlite3://#{Dir.pwd}/retrospective.db")
end

configure :production do
  require 'do_postgres'
  DataMapper.setup(:default, ENV['DATABASE_URL'] || 'postgres://localhost/retrospectiveapp-production')    
end

#### App Routes

get '/' do
  haml :index
end

get '/notes.json' do
  content_type 'text/json', :charset => 'utf-8'
  Note.all.to_json
end

post '/notes.json' do
  content_type 'text/json', :charset => 'utf-8'
  n = Note.new(params[:note])
  n.save
  Pusher[PUSHER_CHANNEL].trigger_async('note-create', n.to_json)
  n.to_json
end

put '/notes/:id/softupdate.json' do
  content_type 'text/json', :charset => 'utf-8'
  Pusher[PUSHER_CHANNEL].trigger_async('note-softupdate', params[:note].to_json, params[:socket_id])
  params[:note].to_json
end


put '/notes/:id.json' do |id|
  content_type 'text/json', :charset => 'utf-8'
  n = Note.get(id)
  n.update(params[:note])
  Pusher[PUSHER_CHANNEL].trigger_async('note-update', n.to_json)
  n.to_json
end

delete '/notes/:id.json' do |id|
  content_type 'text/json', :charset => 'utf-8'
  n = Note.get(id).destroy!
  Pusher[PUSHER_CHANNEL].trigger_async('note-destroy', {:id => id}.to_json)
  {:id => id}.to_json
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