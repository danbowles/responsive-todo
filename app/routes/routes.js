module.exports = function(router, passport) {
  
  router.get('/', isLoggedIn, function(req, res) {
    res.render('index', {
      user: req.user
    });
  });

  router.get('/login', function(req, res) {
    console.log(req.message.text && {message: req.message});
    res.render('login', req.message.text && {message: req.message});
  });

  router.post('/login', passport.authenticate('local-login', {
    successRedirect : '/',
    failureRedirect : '/login',
    failureFlash : true
  }));

  router.get('/logout', function(req, res) {
    req.logout();
    req.flash('type', 'info');
    req.flash('message', 'Thanks for hanging out!');
    res.redirect('/login');
  });

  router.get('/signup', function(req, res) {
    res.render('signup');
  });

  router.post('/signup', passport.authenticate('local-signup', {
    successRedirect: '/',
    failureRedirect: '/signup',
    failureFlash: true
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