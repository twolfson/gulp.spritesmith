var childUtils = require('./utils/child.js');

describe('gulp-spritesmith', function () {
  describe('running a task without any options', function () {
    childUtils.run('gulp sprite-default');

    it.skip('generates a top-down png', function () {

    });

    it.skip('generates a css file', function () {

    });
  });

  describe('running a task with output formats', function () {
    childUtils.run('gulp sprite-formats');

    it.skip('generates a top-down jpg', function () {

    });

    it.skip('generates a Stylus file', function () {

    });
  });

  describe('running a task with engine and algorithm options', function () {
    childUtils.run('gulp sprite-options');

    it.skip('generates an alt-diagonal png via the gm engine', function () {

    });

    it.skip('generates a CSS file with alt-diagonal coordinates', function () {

    });
  });
});
