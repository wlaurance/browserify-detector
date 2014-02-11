var bsd = require('./index');
var should = require('should');
var fs = require('fs');

describe('browserify-detector', function() {

  it('should pass back err if the 1st param is not a string', function(done) {
    bsd(1, function(err) {
      err.toString().should.be.equal('Error: browserify-detector usage: fn(string, function)');
      done();
    });
  });

  it('should pass back null if no browserify markings are found', function(done) {
    bsd('no browserify found in here', function(err, obj) {
      should.equal(null, err);
      should.equal(null, obj);
      done();
    });
  });

  it('should test if a file has browserify markings', function(done) {
    bsd(
      fs.readFileSync('./bundle.js').toString()
      ,
      function(
        err,
        result
      ) {
          should.equal(err, null);
          result.should.have.property('lines');
          done();
      }
    );
  });

});
