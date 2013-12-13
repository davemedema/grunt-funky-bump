'use strict';

var grunt = require('grunt');

/*
  ======== A Handy Little Nodeunit Reference ========
  https://github.com/caolan/nodeunit

  Test methods:
    test.expect(numAssertions)
    test.done()
  Test assertions:
    test.ok(value, [message])
    test.equal(actual, expected, [message])
    test.notEqual(actual, expected, [message])
    test.deepEqual(actual, expected, [message])
    test.notDeepEqual(actual, expected, [message])
    test.strictEqual(actual, expected, [message])
    test.notStrictEqual(actual, expected, [message])
    test.throws(block, [error], [message])
    test.doesNotThrow(block, [error], [message])
    test.ifError(value)
*/

exports.patch_test = {

  setUp: function(done) {
    done();
  },

  works: function(test) {
    var expected = '0.1.1';

    var json = grunt.file.readJSON('tmp/package.json');
    var pkg = grunt.config('bumpPkg');

    test.expect(2);
    test.equal(json.version, expected, 'Should be equal.');
    test.equal(pkg.version, expected, 'Should be equal.');
    test.done();
  }

};
