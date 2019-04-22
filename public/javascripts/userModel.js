var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var User = new Schema({
  id : { type: String, require: true, unique: true},
  displayName : {type: String},
  twitterID : {type: String},
  image_url : {type: String},
  access_token : {type: String, require: true},
  access_token_secret : {type: String, require: true},
});

module.exports = mongoose.model('User', User);
