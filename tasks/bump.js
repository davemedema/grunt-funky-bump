/*
 * grunt-funky-bump
 * https://github.com/davemedema/grunt-funky-bump
 *
 * Copyright (c) 2013 Dave Medema
 * Licensed under the MIT license.
 */

'use strict';

var semver = require('semver');

/**
 * Returns the prevalent indentation in `str`.
 *
 * @param {String} str
 * @return {String}
 */
function getIndentation(str) {
  var spaces = str.match(/^[ ]+/gm) || [];
  var tabs = str.match(/^[\t]+/gm) || [];

  var prevalent = (tabs.length >= spaces.length) ? tabs : spaces;
  var space;

  var len = prevalent.length;
  for (var i = 0; i < len; i++) {
    if (!space || (prevalent[i].length < space.length)) {
      space = prevalent[i];
    }
  }

  return space;
}

/**
 * Exports.
 *
 * @param {Object} grunt
 */
module.exports = function(grunt) {

  // register task
  grunt.registerTask('bump', 'Bump a package version.', function(release) {
    var opts = this.options({
      configProp: 'pkg',
      file: 'package.json',
    });

    // Validate opts.file
    if (!grunt.file.exists(opts.file)) {
      grunt.warn('File "' + opts.file + '" not found.');
    }

    // read and parse opts.file
    var jsonStr = grunt.file.read(opts.file);
    var json    = JSON.parse(jsonStr);

    // make sure we're updating a valid semantic version
    if (!semver.valid(json.version)) {
      grunt.warn('"' + json.version + '" is not a valid semantic version.');
    }

    // validate release
    release = (release || 'patch').toLowerCase();

    var releaseTypes = ['major', 'minor', 'patch', 'prerelease'];

    if (releaseTypes.indexOf(release) === -1 && !semver.valid(release)) {
      grunt.warn('"' + release + '" is not a valid release type or semantic version.');
    }

    // update json
    json.version = semver.valid(release) || semver.inc(json.version, release);

    // write opts.file
    var indentation = getIndentation(jsonStr);

    if (!grunt.file.write(opts.file, JSON.stringify(json, null, indentation))) {
      grunt.warn('Couldn\'t write "' + opts.file + '".');
    }

    // update config property
    grunt.config.set(opts.configProp, json);

    // inform
    grunt.log.ok('Bumped to: ' + json.version);
  });

};
