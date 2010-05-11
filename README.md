Retrospectiveapp
================

Getting set up on heroku
------------------------

Create a new app (you need to use the bamboo stack)

    heroku create
    heroku stack:migrate bamboo-ree-1.8.7

Get the database set up by running auto migrations from datamapper

    heroku console
    Note.auto_migrate!

Setup environment variables for pusher.

    heroku config:add PUSHER_APP_ID=_ PUSHER_KEY=_ PUSHER_SECRET=_

Done!
