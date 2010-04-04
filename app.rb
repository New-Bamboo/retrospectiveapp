#### Gem dependencies

require 'rubygems'
require 'sinatra'
require 'haml'
require 'dm-core'
require 'dm-serializer'
require 'pusher'
Pusher.key = 'c9f08e8c50f6f0cfb136'

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
  n = Note.new(params)
  n.save
  Pusher['retrospectiveapp-development'].trigger('note-create', n.attributes.to_json)
  n.attributes.to_json
  # if successful, broadcast note creation to all browser windows 
end

put '/notes/:id.json' do |id|
  content_type 'text/json', :charset => 'utf-8'
  n = Note.get(id).update(params)
  n.attributes.to_json
  # if successful, broadcast note update to all browser windows
end

delete '/notes/:id.json' do |id|
  content_type 'text/json', :charset => 'utf-8'
  n = Note.get(id).destroy!
  # if successful, broadcast note deletion to all browser windows
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