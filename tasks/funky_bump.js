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
  grunt.registerMultiTask('funky_bump', 'Bump semantic versions in JSON files.', function(release) {
    var opts = this.options({
      configProp: 'pkg',
      jsonProp: 'version',
      updateConfig: true
    });

    // Bump each src-dest file pair
    this.files.forEach(function(fm) {
      fm.src.forEach(function(filepath) {
        var dest    = fm.dest || filepath;
        var jsonStr = grunt.file.read(filepath);
        var json    = JSON.parse(jsonStr);
        
        // Validate opts.jsonProp
        if (!json[opts.jsonProp]) {
          fail('"' + opts.jsonProp + '" property not found.');
        }

        // Validate old version
        var oldVersion = json[opts.jsonProp];

        if (!semver.valid(oldVersion)) {
          fail('"' + oldVersion + '" is not a valid semantic version.');
        }

        // Validate release
        release = (release || 'patch').toLowerCase();

        if (!/^(major|minor|patch|prerelease)$/i.test(release) && !semver.valid(release)) {
          fail('"' + release + '" is not a valid release type or a semantic version.');
        }

        // Bump release
        var newVersion = semver.valid(release) || semver.inc(oldVersion, release);

        // Update JSON
        json[opts.jsonProp] = newVersion;

        // Write JSON
        var space = getSpace(jsonStr);

        if (!grunt.file.write(dest, JSON.stringify(json, null, space))) {
          fail('Couldn\'t write "' + dest + '".');
        }

        // Update opts.configProp
        if (opts.updateConfig) {
          grunt.config.set(opts.configProp, json);
        }

        // Inform
        grunt.log.ok('Bumped to: ' + newVersion);
      });
    });
  });

};
