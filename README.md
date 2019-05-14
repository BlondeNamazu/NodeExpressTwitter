# NodeExpressTwitter

This is sample application using Express on Node.js to implement Twitter OAuth.

## How it works

When you access [home](http://nodeexpresstwitterlogintest.namazu.trap.show/) and click `Sign in with Twitter`, Twitter OAuth requires your permission. If you allow it, app leads you to `/me` page, then you can post tweet via app.

## Using frameworks

### Node.js
Basic framework for whole app.

### Express
Routing management

### Twitter OAuth
Authentication for using this app.

### MongoDB
Store user data.

## Required environmental variables

You should specify following variables to `.env` file on root.

- `MONGODB_USERNAME`
username for mongodb.
- `MONGODB_PASSWORD`
password for mongodb user.
- `MONGODB_HOSTNAME`
absolute path to root directory of running mongodb.
- `MONGODB_DATABASE`
database name for db.
- `PORT`
exporting port (default : 3000)
- `NODE_TWITTER_CONSUMER_KEY`
consumer key for your twitter app.
- `NODE_TWITTER_CONSUMER_SECRET`
consumer secret key for your twitter app.
- `NODE_URI_HOME`
absolute path for home directory


## How to run this app

1. clone this app to `${HOME}`
2. cd `${HOME}`
3. run `npm install` (only first time)
4. run `npm start`

***NOTE***

MongoDB should be running before starting this app.
