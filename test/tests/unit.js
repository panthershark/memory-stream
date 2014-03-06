var fs = require('fs');
var path = require('path');
var assert = require('assert');
var source = path.join(process.cwd(), 'test/source.txt');
var gold = fs.readFileSync(source);
var MemoryStream = require('../../index.js');

suite('Test Memory Stream', function() {

  test('Stream file', function(done) {
  	var rs = fs.createReadStream(source);
  	var ws = new MemoryStream();

  	ws.on('finish', function() {
  	  // console.log(gold.toString());
  	  // console.log(ws.get().toString());
  	  assert.equal(ws.get().toString(), gold.toString(), 'Output should equal file source.');
  	  done();
  	});

  	rs.pipe(ws);

  });

});