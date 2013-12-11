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

exports.all_test = {

  setUp: function(done) {
    done();
  },

  custom_json_prop: function(test) {
    var jsonStr = grunt.file.read('tmp/custom_json_prop.json');
    var json = JSON.parse(jsonStr);

    test.expect(1);
    test.equal(json.foo, '0.1.1', 'Should be equal.');
    test.done();
  },

  default_json_prop: function(test) {
    var jsonStr = grunt.file.read('tmp/default_json_prop.json');
    var json = JSON.parse(jsonStr);

    test.expect(1);
    test.equal(json.version, '0.1.1', 'Should be equal.');
    test.done();
  },

  update_config: function(test) {
    var config = grunt.config('test');

    test.expect(1);
    test.equal(config.version, '0.1.1', 'Should be equal.');
    test.done();
  }

};
