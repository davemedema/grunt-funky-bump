# grunt-funky-bump

Bump a package version.

## Getting Started
This plugin requires Grunt `~0.4.2`

If you haven't used [Grunt](http://gruntjs.com/) before, be sure to check out the [Getting Started](http://gruntjs.com/getting-started) guide, as it explains how to create a [Gruntfile](http://gruntjs.com/sample-gruntfile) as well as install and use Grunt plugins. Once you're familiar with that process, you may install this plugin with this command:

```shell
npm install grunt-funky-bump --save-dev
```

Once the plugin has been installed, it may be enabled inside your Gruntfile with this line of JavaScript:

```js
grunt.loadNpmTasks('grunt-funky-bump');
```

## The "bump" task

### Overview
No config is needed since the default options are pretty solid. If you want to override some of the default options have at it. In your project's Gruntfile, add a section named `bump` to the data object passed into `grunt.initConfig()`.

```js
grunt.initConfig({
  bump: {
    options: {
      // Options go here.
    }
  }
});
```

### Options

#### options.configProp
Type: `String`
Default value: `pkg`

The config property that will be updated after a successful bump. Useful when you need to use the new version in other tasks or templates.

#### options.file
Type: `String`
Default value: `package.json`

The JSON file to update.

### Usage Example

```js
grunt.initConfig({
  pkg: grunt.file.readJSON('package.json'),
  uglify: {
    example: {
      src: ['app.js'],
      dest: 'app.<%= pkg.version %>.js'
    }
  }
});

grunt.registerTask('release', function(type) {
  grunt.task.run('bump:' + (type || 'patch'));
  grunt.task.run('uglify');
  grunt.task.run('tag');
});
```

## Contributing
In lieu of a formal styleguide, take care to maintain the existing coding style. Add unit tests for any new or changed functionality. Lint and test your code using [Grunt](http://gruntjs.com/).

## Attribution

I took a good portion of the `getIndentation` function from [darsain](https://github.com/darsain) and his [grunt-bumpup](https://github.com/Darsain/grunt-bumpup) project.
