var mongoose = require('mongoose');
var bcrypt = require('bcrypt-nodejs');

var UserSchema = new mongoose.Schema({
	username: {
		type: String,
		required: true,
		unique: true
	},
	password: {
		type: String,
		require: true
	}
});

UserSchema.pre('save', function(callback) {
	var user = this;

  // http://scottksmith.com/blog/2014/05/29/beer-locker-building-a-restful-api-with-node-passport/
});