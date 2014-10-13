var should = require('should');
var mongoose = require('mongoose');
var User = require('app/models/user');

var db;

describe('User', function() {
  before(function(done) {
    db = mongoose.connect('mongodb://localhost/test');
    done();
  });

  after(function(done) {
    mongoose.connection.close();
    done();
  });

  beforeEach(function(done) {
    var user = new User({
      email: 'dan@dan.dan',
      password: 'testy'
    });

    user.save(function(error) {
      if (error) console.log('error' + error.message);
      else console.log('no error');
      done();
    });
  });

  it('find a user by email', function(done) {
    User.findOne({email: 'dan@dan.dan'}, function(err, user) {
      user.email.should.eql('dan@dan.dan');
      done();
    });
  });

  afterEach(function(done) {
    User.remove({}, function() {
      done();
    });
  });
});