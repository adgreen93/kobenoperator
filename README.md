# Patron - A Messenger Bot For Bar Reccomendations in NYC.
![Alt Text](https://s3.amazonaws.com/aws-website-portfoliosite-bf6tr/patron-messenger-short-header.png)
Built using Express and Mongo (with Botkit)

This app was built using [Botkit](https://github.com/howdyai/botkit).

* Release date will be January 2017 - I may use actual bars or just use dummy data - but either way it'll be hosted on Heroku, and available to the general public to experiment with.


## Features

![Alt Text](https://s3.amazonaws.com/patron-bars/gifs/patron-bar-search-borough.gif)


![Alt Text](https://s3.amazonaws.com/patron-bars/gifs/patron-bar-search-price.gif)

![Alt Text](https://s3.amazonaws.com/patron-bars/gifs/patron-bar-search-type.gif)

* Serves webpages through standard express routes
```
app/routes/routes.js

```

* Add new bars to the database.

```
app/views/maker.js

```

* Stores users ID when a new user clicks on "Send to Messenger"

## Configuration

* For local deployment

There are quite a number of steps to set up a Facebook bot

1) Create a Facebook page. Add Page ID in .env file (rename the .env-demo file)

2) Create a Facebook app. Add App ID in .env file

3) Add Messenger to your App, then select the Page, to generate a Page Access token. Add Token in .env file

4) install localtunnel to your computer, then use this command to make it available for webhooks
```
lt --subdomain yourappname --port 5000
```

5) Add Webhooks to your app

5.1) Choose a verify token, add it to the .env file as well

5.2) Set the app webhook url to https://yourappname.localtunnel.me/webhook

5.3) Restart your server and click verify

* For Heroku deployment

Add Page ID, App ID, and token as environment variables.
Change the webhook route to match your deployed domain name.

You can use MongoLab add-on to add Mongo storage, they have a free tier.


## Licence
Shared under [MIT licence](http://choosealicense.com/licenses/mit/)
