var express = require('express');
var router = express.Router();

router.get('/list', function(req, res) {
  var db = req.db;
  
  db.collection('todos').find().toArray(function(err, items) {
    res.json(items);
  });
});

router.put('/list/:item_id', function(req, res) {
	res.json(req.params.item_id);
	// find todo item with id 'item_id' and set it's done to 'true'
});

module.exports = router;