var mongoose = require('mongoose');

var TodoSchema = new mongoose.Schema({
	name: String,
	done: Boolean,
  user: [mongoose.Schema.Types.ObjectId]
});

module.exports = mongoose.model('Todo', TodoSchema);