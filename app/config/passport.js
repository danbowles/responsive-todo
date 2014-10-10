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
          return done(null, false,
            req.flash('signupMessage', 'That email address is already being used'));
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
      if (err) {
        return done(err);
      }

      if(!user) {
        return done(null, false, req.flash('loginMessage', 'No user found.'));
      }

      if (!user.validPassword(password)) {
        return done(null, false, req.flash('loginMessage', 'Wrong Username and/or Password'));
      }

      return done(null, user);
    });
  }));
};