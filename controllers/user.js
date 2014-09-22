var express = require('express');
var router = express.Router();

var User = require('../models/user');

var usersRoute = router.route('/users');
usersRoute.get(function(req, res) {
  User.find(function(err, users) {
    if (err) res.send(err);

    res.json(users);
  });
})
.post(function(req, res) {
  var user = new User({
    username: req.body.username,
    password: req.body.password
  });

  user.save(function(err) {
    if (err) res.send(err);

    res.json({message: 'User created successfully'});
  });
});

module.exports = router;