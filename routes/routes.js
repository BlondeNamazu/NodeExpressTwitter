'use strict';
var configRoutes;
var fs = require('fs');
var User = require('./../public/javascripts/userModel');

configRoutes = function(app, server, passport) {
    app.get('/me', function(request, response) {
      if(!request.session.passport || !request.session.passport.user) {
        console.log("request.session.passport.user not found");
        response.redirect('/');
      }
      //console.log("request.session.passport.user : "+request.session.passport.user)
      User.findOne({id:request.session.passport.user},(err,user)=>{
        if(err || !user){
          //console.log("failed to find user : " + request.session.passport.user);
          response.redirect('/');
        } else {
          response.render('me',{
            id : user.id,
            displayName : user.displayName,
            screen_name : user.twitterID,
            image_url : user.image_url,
          });
        }
      })
    });
    app.get('/tweet/:ID/:content', function(request, response) {
      // 認証保護
      if(request.session.passport.user != request.params.ID){
        console.log("authentication failed");
        response.redirect('/');
      } else {
        User.findOne({id:request.session.passport.user},(err,user)=>{
          if(err || !user){
            console.log("failed to find user : " + request.session.passport.user);
            response.redirect('/');
          } else {
            var twitter = require('twitter');
            var client_json = {
              "consumer_key": process.env.NODE_TWITTER_CONSUMER_KEY,
              "consumer_secret": process.env.NODE_TWITTER_CONSUMER_SECRET,
              "access_token_key": user.access_token,
              "access_token_secret": user.access_token_secret
            }
            var client = new twitter(client_json);
            var tweetcontent = request.params.content == '' ? "test tweet" : request.params.content;
            client.post('statuses/update', {status: tweetcontent}, function(err, tweet, response){
              if(err) console.log(err);
            });
            response.redirect('/me');
          }
        })

      }
    });

    // passport-twitter ----->
    // http://passportjs.org/guide/twitter/
    app.get('/auth/twitter', passport.authenticate('twitter',{session: false}));
    app.get('/auth/twitter/callback', 
        passport.authenticate('twitter', {failureRedirect: '/' }),
          function(req,res){
            //console.log("contents of req at /auth/twitter/callback");
            //console.log(req.user.twitter_token);
            //console.log(req.user.twitter_token_secret);
            res.redirect('/me');
          }
        );
    // <-----
}

module.exports = {configRoutes: configRoutes};
