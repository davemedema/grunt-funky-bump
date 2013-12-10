/*
 * grunt-funky-bump
 * https://github.com/davemedema/grunt-funky-bump
 *
 * Copyright (c) 2013 Dave Medema
 * Licensed under the MIT license.
 */

'use strict';

var semver = require('semver');

function getSpace(src) {
  var spaces = src.match(/^[ ]+/gm) || [];
  var tabs = src.match(/^[\t]+/gm) || [];

  var prevalent = (tabs.length >= spaces.length) ? tabs : spaces;
  var space;

  for (var i = 0; i < prevalent.length; i++) {
    if (!space || (prevalent[i].length < space.length)) {
      space = prevalent[i];
    }
  }

  return space;
}

module.exports = function(grunt) {

  function fail(message, error) {
    if (error) grunt.log.error(error);
    grunt.fail.warn(message || 'Task failed.');
  }

  grunt.registerTask('funky_bump', function (version) {
    // Read package.json
    var pkgPath = 'package.json';

    if (!grunt.file.exists(pkgPath)) {
      fail('"' + pkgPath + '" not found.');
    }

    var pkgFile = grunt.file.read(pkgPath);
    var pkg = JSON.parse(pkgFile);

    if (!semver.valid(pkg.version)) {
      fail('Invalid "' + pkgPath + '".');
    }

    // Update pkg.version
    version = (version || 'patch').toLowerCase();

    if (!/^(major|minor|patch|prerelease)$/i.test(version) && !semver.valid(version)) {
      fail('"' + version + '" is not a valid release type or a semantic version.');
    }

    pkg.version = semver.valid(version) || semver.inc(pkg.version, version);

    // Write package.json
    var space = getSpace(pkgFile);

    if (!grunt.file.write('package.json', JSON.stringify(pkg, null, space))) {
      fail('Couldn\'t write to "' + pkgPath + '".');
    }

    // Update `pkg` property
    grunt.config.set('pkg', pkg);

    // Inform
    grunt.log.ok('Bumped to: ' + pkg.version);
  });

};
