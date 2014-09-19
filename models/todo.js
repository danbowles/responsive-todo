var mongoose = require('mongoose');

var TodoSchema = new mongoose.Schema({
	name: String,
	done: Boolean
});

module.exports = mongoose.model('Todo', TodoSchema);