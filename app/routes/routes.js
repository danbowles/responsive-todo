module.exports = function(router, passport) {
  
  router.get('/', isLoggedIn, function(req, res) {
    res.render('index', {
      user: req.user
    });
  });

  router.get('/login', function(req, res) {
    res.render('login', req.message.text && {message: req.message});
  });

  router.post('/login', passport.authenticate('local-login', {
    successRedirect : '/',
    failureRedirect : '/login',
    failureFlash : true
  }));

  router.get('/logout', function(req, res) {
    req.logout();
    // req.flash('type', 'info');
    // req.flash('message', 'Thanks for hanging out!');
    res.redirect('/login');
  });

  router.get('/signup', function(req, res) {
    res.render('signup', req.message.text && {message: req.message});
  });

  router.post('/signup', passport.authenticate('local-signup', {
    successRedirect: '/',
    failureRedirect: '/signup',
    failureFlash: true
  }));

  // Facebook
  router
    .get('/auth/facebook', passport.authenticate('facebook', { scope: 'email'}))
    .get('/auth/facebook/callback', passport.authenticate('facebook', {
      successRedirect: '/',
      failureRedirect: '/login'
    }));

  return router;
};

// Middleware
// TODO - may not use
function isLoggedIn(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }

  res.redirect('/login');
}