'use strict';
var configRoutes;
var fs = require('fs');

configRoutes = function(app, server, passport) {
    app.get('/me', function(request, response) {
        // 認証保護
        if(passport.session && passport.session.user){
          console.log(passport.session.user)
          response.render('me',{ user: passport.session.user})
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
