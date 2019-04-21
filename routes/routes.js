'use strict';
var configRoutes;
var fs = require('fs');

configRoutes = function(app, server, passport) {
    app.get('/me', function(request, response) {
        // 認証保護
        if(passport.session && passport.session.user){
          response.render('me',{ session: passport.session})
        } else {
            response.redirect('/login');
        }   
    });
    app.get('/tweet', function(request, response) {
        // 認証保護
        if(passport.session && passport.session.user){
          var twitter = require('twitter');
          var client_json = {
            "consumer_key": process.env.NODE_TWITTER_CONSUMER_KEY,
            "consumer_secret": process.env.NODE_TWITTER_CONSUMER_SECRET,
            "access_token_key": passport.session.access_token,
            "access_token_secret": passport.session.access_token_secret
          }
          var client = new twitter(client_json);
          client.post('statuses/update', {status: 'test tweet'}, function(err, tweet, response){
            if(!err) console.log(tweet);
            else console.log(err);
          });
          response.redirect('/me');
        } else {
            response.redirect('/login');
        }   
    });

    // passport-twitter ----->
    // http://passportjs.org/guide/twitter/
    app.get('/auth/twitter', passport.authenticate('twitter'));
    app.get('/auth/twitter/callback', 
        passport.authenticate('twitter', { successRedirect: '/me',
                                                failureRedirect: '/login' }));
    // <-----
}

module.exports = {configRoutes: configRoutes};
