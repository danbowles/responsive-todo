var list = [
  {
    text: "Must Do No Matter What",
    priority: 10,
    tasks: [{
      title: "Take out garbage",
      isDone: false
    },{
      title: "random letters",
      isDone: true
    },{
      title: "words and such",
      isDone: false
    }]
  },{
    text: "It would be nice to do these, too",
    priority: 5,
    tasks: [{
      title: "Take out garbage",
      isDone: false
    },{
      title: "Take out garbage",
      isDone: true
    },{
      title: "Take out garbage",
      isDone: true
    }]
  }
];

var express = require('express');
var router = express.Router();

router.get('/list', function(req, res) {
  res.json(list);
});

module.exports = router;