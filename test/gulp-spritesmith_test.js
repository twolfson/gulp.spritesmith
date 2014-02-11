var assert = require('assert');
var fs = require('fs');
var rimraf = require('rimraf');
var childUtils = require('./utils/child.js');

// Clean up actual-files directory
before(function (done) {
  rimraf(__dirname + '/actual-files/', done);
});

describe('gulp-spritesmith', function () {
  describe('running a task without any options', function () {
    childUtils.run('gulp sprite-default');

    it('generates a top-down png', function () {
      var actualImage = fs.readFileSync(__dirname + '/actual-files/default/sprite.png', 'binary');
      var expectedImages = [
        __dirname + '/expected-files/default/mint-graphicsmagick.png',
        __dirname + '/expected-files/default/mint-imagemagick.png'
      ];
      var i = 0;
      var len = expectedImages.length;
      for (; i < len; i++) {
        var expectedImage = fs.readFileSync(expectedImages[i], 'binary');
        if (expectedImage === actualImage) {
          return;
        }
      }
      assert.fail('Could not find a matching image');
    });

    it('generates a css file', function () {
      var expectedCss = fs.readFileSync(__dirname + '/expected-files/default/sprite.css', 'utf8');
      var actualCss = fs.readFileSync(__dirname + '/actual-files/default/sprite.css', 'utf8');
      assert.strictEqual(expectedCss, actualCss);
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
