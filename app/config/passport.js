var LocalStrategy = require('passport-local').Strategy;

var User = require('../models/user');

// Only needed for social login
// var authConfig = require('./auth');

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
};

function flashWarning(message, req) {
  req.flash('type', 'warning');
  req.flash('message', message);
}