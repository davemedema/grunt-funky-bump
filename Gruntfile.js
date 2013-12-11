/*
 * grunt-funky-bump
 * https://github.com/davemedema/grunt-funky-bump
 *
 * Copyright (c) 2013 Dave Medema
 * Licensed under the MIT license.
 */

'use strict';

module.exports = function(grunt) {

  // Config
  // ---

  grunt.initConfig({

    // package.json
    pkg: grunt.file.readJSON('package.json'),

    // `clean`
    clean: {
      all: ['tmp']
    },

    // `funky_bump`
    funky_bump: {
      release: {
        src: ['package.json']
      },
      custom_json_prop: {
        options: {
          jsonProp: 'foo',
          updateConfig: false
        },
        src: ['test/fixtures/test.json'],
        dest: 'tmp/custom_json_prop.json'
      },
      default_json_prop: {
        options: {
          updateConfig: false
        },
        src: ['test/fixtures/test.json'],
        dest: 'tmp/default_json_prop.json'
      },
      update_config: {
        options: {
          configProp: 'test',
        },
        src: ['test/fixtures/test.json'],
        dest: 'tmp/update_config.json'
      }
    },

    // `jshint`
    jshint: {
      options: {
        jshintrc: '.jshintrc'
      },
      all: [
        'Gruntfile.js',
        'tasks/*.js',
        '<%= nodeunit.tests %>'
      ]
    },

    // `nodeunit`
    nodeunit: {
      tests: ['test/*_test.js']
    }

  });

  // Load tasks
  // ---

  grunt.loadTasks('tasks');

  // Load npm tasks
  // ---

  require('load-grunt-tasks')(grunt);

  // Task aliases
  // ---

  grunt.registerTask('default', ['test']);

  grunt.registerTask('release', function(type) {
    grunt.task.run('test');
    grunt.task.run('funky_bump:release:' + (type || 'patch'));
    grunt.task.run('funky_tag');
  });

  grunt.registerTask('test', function() {
    grunt.task.run('clean');
    grunt.task.run('jshint');
    grunt.task.run('funky_bump:custom_json_prop');
    grunt.task.run('funky_bump:default_json_prop');
    grunt.task.run('funky_bump:update_config');
    grunt.task.run('nodeunit');
  });
  grunt.registerTask('t', ['test']);

};
