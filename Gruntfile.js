'use strict';

module.exports = function(grunt) {

  // Config
  // ---

  grunt.initConfig({

    // package.json
    pkg: grunt.file.readJSON('package.json'),

    // `bump`
    //bump: {
      //options: {
        //configProp: 'bumpPkg',
        //file: 'tmp/package.json',
      //}
    //},

    // tmp/package.json
    //bumpPkg: {},

    // `clean`
    clean: {
      test: ['tmp']
    },

    // `copy`
    copy: {
      test: {
        src: ['test/fixtures/package.json'],
        dest: 'tmp/package.json'
      }
    },

    // `jshint`
    jshint: {
      options: {
        jshintrc: '.jshintrc'
      },
      all: [
        'Gruntfile.js',
        'tasks/**/*.js',
        'test/**/*.js'
      ]
    },

    // `nodeunit`
    nodeunit: {
      prerelease: ['test/prerelease_test.js'],
      patch: ['test/patch_test.js'],
      minor: ['test/minor_test.js'],
      major: ['test/major_test.js'],
      version: ['test/version_test.js']
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
    grunt.task.run('bump:' + (type || 'patch'));
    grunt.task.run('tag');
  });

  grunt.registerTask('test', function() {
    grunt.task.run('clean');
    grunt.task.run('copy');
    grunt.task.run('jshint');
    grunt.task.run('bump:prerelease');
    grunt.task.run('nodeunit:prerelease');
    grunt.task.run('bump:patch');
    grunt.task.run('nodeunit:patch');
    grunt.task.run('bump:minor');
    grunt.task.run('nodeunit:minor');
    grunt.task.run('bump:major');
    grunt.task.run('nodeunit:major');
    grunt.task.run('bump:0.1.0');
    grunt.task.run('nodeunit:version');
  });
  grunt.registerTask('t', ['test']);
};

