var LocalStrategy = require('passport-local').Strategy;
var FacebookStrategy = require('passport-facebook').Strategy;

var User = require('../models/user');

// Only needed for social login
var authConfig = require('./auth');

module.exports = function(passport) {
  // Serialze / Deserialize
  passport.serializeUser(function(user, done) {
    done(null, user.id);
  });

  passport.deserializeUser(function(id, done) {
    User.findById(id, function(err, user) {
      done(err, user);
    });
  });

  // Local Login / Signup
  passport.use('local-signup', new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password',
    passReqToCallback: true
  },
  function(req, email, password, done) {
    var newUser;
    process.nextTick(function() {
      User.findOne({ 'local.email': email }, function(err, user) {
        if (err) {
          done(err);
        }
        if (user) {
          flashWarning('That email is already in use.', req);
          return done(null, false);
        } else {
          newUser = new User();

          newUser.local.email = email;
          newUser.local.password = newUser.generateHash(password);

          newUser.save(function(err) {
            if (err) {
              throw err;
            }

            return done(null, newUser);
          });
        }
      });
    });
  }));

  passport.use('local-login', new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password',
    passReqToCallback: true
  },
  function(req, email, password, done) {
    User.findOne({ 'local.email': email }, function(err, user) {
      var message = 'Wrong Username and/or Password.';
      if (err) {
        return done(err);
      }

      if(!user) {
        flashWarning(message, req);
        return done(null, false);
      }

      if (!user.validPassword(password)) {
        flashWarning(message, req);
        return done(null, false);
      }

      return done(null, user);
    });
  }));

  // Facebook
  passport.use(new FacebookStrategy({
    clientID:     authConfig.facebookAuth.clientID,
    clientSecret: authConfig.facebookAuth.clientSecret,
    callbackURL:  authConfig.facebookAuth.callbackURL,
    passReqToCallback: true
  },
  function(req, token, refreshToken, profile, done) {
    process.nextTick(function() {
      if (!req.user) {
        User.findOne({ 'facebook.id': profile.id}, function(err, user) {
          if (err) {
            return done(err);
          }

          if (user) {

            if (!user.facebook.token) {
              user.facebook.token = token;
              user.facebook.name = profile.name.givenName + ' ' + profile.name.familyName;
              user.facebook.email = profile.emails[0].value;

              user.save(function(err) {
                if (err) {
                  throw err;
                }
              });
            }

            return done(null, user);
          } else {
            var newUser = new User();

            newUser.facebook.id = profile.id;
            newUser.facebook.token = token;
            newUser.facebook.name = profile.name.givenName + ' ' + profile.name.familyName;
            newUser.facebook.email = profile.emails[0].value;

            newUser.save(function(err) {
              if (err) {
                throw err;
              }

              return done(null, newUser);
            });
          }
        });
      } else {
        var user = req.user;

        user.facebook.id = profile.id;
        user.facebook.token = token;
        user.facebook.name = profile.name.givenName + ' ' + profile.name.familyName;
        user.facebook.email = profile.emails[0].value;

        user.save(function(err) {
          if (err) {
            throw err;
          }
          return done(null, user);
        });
      }
    });
  }));
};

function flashWarning(message, req) {
  req.flash('type', 'warning');
  req.flash('message', message);
}