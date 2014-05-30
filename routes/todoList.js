var express = require('express');
var router = express.Router();

router.get('/list', function(req, res) {
  var db = req.db;
  
  db.collection('todos').find().toArray(function(err, items) {
    res.json(items);
  });
});

module.exports = router;