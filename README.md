# Patron - FB Messenger Bot For Bar Recommendations in NYC
![Alt Text](https://s3.amazonaws.com/aws-website-portfoliosite-bf6tr/patron-messenger-short-header.png)


This app was built using [Botkit](https://github.com/howdyai/botkit).
* Built using Express and MongoDB.
* This will be hosted on Heroku, and available to the general public to experiment with.
* Mongoose is the DB driver, hosted on mlab. Database is forty real bars across three boroughs and Long Island (Nassau County).

## Features

* Search by borough

![Alt Text](https://s3.amazonaws.com/patron-bars/gifs/patron-bar-search-borough.gif)

* Search by price range, from 1 to 5 (cheap to expensive).

![Alt Text](https://s3.amazonaws.com/patron-bars/gifs/patron-bar-search-price.gif)


## Configuration

* Serves webpages through standard express routes

```
app/routes/routes.js
```

* Main page of the site.
```
app/views/home.js
```

* Change the schema of bars(called stages in the code, because I'm insane).

```
app/models/stages.js
```

* Add new bars to the database.

```
app/views/maker.js
```

* Stores users ID when a new user clicks on "Send to Messenger"

## Setup

As per original set up instructions.

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
