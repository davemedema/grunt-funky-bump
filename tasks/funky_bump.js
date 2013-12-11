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
 * Returns the prevalent spacing in `str`.
 *
 * @param {String} str
 * @return {String}
 */
function getSpace(str) {
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

  /**
   * Displays `message` and aborts Grunt. Optionally logs `error`.
   *
   * @param {String} message
   * @param {Mixed} error
   */
  function fail(message, error) {
    if (error) grunt.log.error(error);
    grunt.fail.warn(message || 'Task failed.');
  }

  // Register task
  grunt.registerTask('funky_bump', 'Bump a package version.', function(release) {

    // Read pkg
    var pkgPath = 'package.json';
    var pkgStr  = grunt.file.read(pkgPath);
    var pkg     = JSON.parse(pkgStr);
    
    // Validate pkg.version
    if (!semver.valid(pkg.version)) {
      fail('"' + pkg.version + '" is not a valid semantic version.');
    }

    // Validate release
    release = (release || 'patch').toLowerCase();

    if (!/^(major|minor|patch|prerelease)$/i.test(release) && !semver.valid(release)) {
      fail('"' + release + '" is not a valid release type or a semantic version.');
    }

    // Bump pkg.version
    pkg.version = semver.valid(release) || semver.inc(pkg.version, release);

    // Write pkgPath
    var space = getSpace(pkgStr);

    if (!grunt.file.write(pkgPath, JSON.stringify(pkg, null, space))) {
      fail('Couldn\'t write "' + pkgPath + '".');
    }

    // Update grunt.config
    grunt.config.set('pkg', pkg);

    // Inform
    grunt.log.ok('Bumped to: ' + pkg.version);
  });

};
