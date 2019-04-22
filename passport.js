// http://passportjs.org/guide/twitter/
var TWITTER_CONSUMER_KEY = process.env.NODE_TWITTER_CONSUMER_KEY;
var TWITTER_CONSUMER_SECRET = process.env.NODE_TWITTER_CONSUMER_SECRET;
var passport = require('passport')
  , TwitterStrategy = require('passport-twitter').Strategy;
var User = require('./public/javascripts/userModel');

// Sessionの設定
// http://passportjs.org/guide/configure/
passport.serializeUser(function(profile, done) {
    console.log("user information is serialized! user : "+profile.userid);
    User.find({id : profile.userid},(err,user)=>{
      var newUser = new User({
        id : profile.userid,
        displayName : profile.displayName,
        twitterID : profile.twitterID,
        image_url : profile.image_url,
        access_token : profile.twitter_token,
        access_token_secret : profile.twitter_token_secret
      });
      if(!user || user.length==0){
        newUser.save(function(err){
          if(err) console.log(err);
          else console.log("new User " + profile.displayName + " is registered to db!");
        });
      }
    })
    done(null, profile.userid);
});
passport.deserializeUser(function(obj, done) {
    console.log("user information is deserialized! user : "+obj);
    done(null, obj);
});

passport.use(new TwitterStrategy({
    consumerKey: TWITTER_CONSUMER_KEY,
    consumerSecret: TWITTER_CONSUMER_SECRET,
    callbackURL: process.env.NODE_URI_HOME + "auth/twitter/callback"
  },
  function(token, tokenSecret, profile, done) {

    // tokenとtoken_secretをセット
    profile.userid = profile._json.id_str;
    profile.twitter_token = token;
    profile.twitter_token_secret = tokenSecret;
    profile.displayName = profile._json.name;
    profile.twitterID = profile._json.screen_name;
    profile.image_url = profile._json.profile_image_url;

    process.nextTick(function () {
        return done(null, profile);
    });
  }
));

module.exports = {passport: passport};
