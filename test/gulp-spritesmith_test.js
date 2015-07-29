var assert = require('assert');
var fs = require('fs');
var rimraf = require('rimraf');
var imageUtils = require('./utils/image.js');
var childUtils = require('./utils/child.js');

// Clean up actual-files directory
before(function (done) {
  rimraf(__dirname + '/actual-files/', done);
});

describe('gulp.spritesmith', function () {
  describe('running a task without any options', function () {
    childUtils.run('gulp sprite-default');
    imageUtils.loadActual(__dirname + '/actual-files/default/sprite.png');
    imageUtils.loadExpected(__dirname + '/expected-files/default/pixelsmith.png');

    it('generates an image', function () {
      assert.deepEqual(this.actualPixels, this.expectedPixels);
    });

    it('generates a css file', function () {
      var actualCss = fs.readFileSync(__dirname + '/actual-files/default/sprite.css', 'utf8');
      var expectedCss = fs.readFileSync(__dirname + '/expected-files/default/sprite.css', 'utf8');
      assert.strictEqual(actualCss, expectedCss);
    });
  });

  describe('running a task with retina options', function () {
    childUtils.run('gulp sprite-retina');
    imageUtils.loadActual(__dirname + '/actual-files/retina/sprite.png');
    imageUtils.loadExpected(__dirname + '/expected-files/retina/pixelsmith.png');

    it('generates an image', function () {
      assert.deepEqual(this.actualPixels, this.expectedPixels);
    });

    describe('with respect to the retina image', function () {
      imageUtils.loadActual(__dirname + '/actual-files/retina/sprite@2x.png');
      imageUtils.loadExpected(__dirname + '/expected-files/retina/pixelsmith@2x.png');

      it('generates an image', function () {
        assert.deepEqual(this.actualPixels, this.expectedPixels);
      });
    });

    it('generates a css file', function () {
      var actualCss = fs.readFileSync(__dirname + '/actual-files/retina/sprite.css', 'utf8');
      var expectedCss = fs.readFileSync(__dirname + '/expected-files/retina/sprite.css', 'utf8');
      assert.strictEqual(actualCss, expectedCss);
    });
  });

  describe('returns "img" and "css" streams', function () {
    childUtils.run('gulp sprite-two-streams');
    imageUtils.loadActual(__dirname + '/actual-files/two-streams/sprite.png');
    imageUtils.loadExpected(__dirname + '/expected-files/two-streams/pixelsmith.png');

    it('generates an image', function () {
      assert.deepEqual(this.actualPixels, this.expectedPixels);
    });

    it('generates a css file', function () {
      var actualCss = fs.readFileSync(__dirname + '/actual-files/two-streams/sprite.css', 'utf8');
      var expectedCss = fs.readFileSync(__dirname + '/expected-files/two-streams/sprite.css', 'utf8');
      assert.strictEqual(actualCss, expectedCss);
    });
  });

  describe('returns retina "img" in two streams', function () {
    childUtils.run('gulp sprite-retina-two-streams');
    imageUtils.loadActual(__dirname + '/actual-files/retina-two-streams/sprite.png');
    imageUtils.loadExpected(__dirname + '/expected-files/retina-two-streams/pixelsmith.png');

    it('generates an image', function () {
      assert.deepEqual(this.actualPixels, this.expectedPixels);
    });

    describe('with respect to the retina image', function () {
      imageUtils.loadActual(__dirname + '/actual-files/retina-two-streams/sprite@2x.png');
      imageUtils.loadExpected(__dirname + '/expected-files/retina-two-streams/pixelsmith@2x.png');

      it('generates an image', function () {
        assert.deepEqual(this.actualPixels, this.expectedPixels);
      });
    });
  });

  describe('running a task with output formats', function () {
    childUtils.run('gulp sprite-formats');
    imageUtils.loadActual(__dirname + '/actual-files/formats/sprite.jpg');
    imageUtils.loadExpected(__dirname + '/expected-files/formats/mint-pngsmith.png');

    it('generates a top-down png (as a .jpg)', function () {
      assert.deepEqual(this.actualPixels, this.expectedPixels);
    });

    it('generates a Stylus file (as a .css)', function () {
      var actualCss = fs.readFileSync(__dirname + '/actual-files/formats/sprite.css', 'utf8');
      var expectedCss = fs.readFileSync(__dirname + '/expected-files/formats/sprite.styl', 'utf8');
      assert.strictEqual(actualCss, expectedCss);
    });
  });

  describe('running a task with engine and algorithm options', function () {
    childUtils.run('gulp sprite-options');
    imageUtils.loadActual(__dirname + '/actual-files/options/sprite.png');
    imageUtils.loadExpected(__dirname + '/expected-files/options/mint-pngsmith.png');

    it('generates an alt-diagonal png via the gm engine', function () {
      assert.deepEqual(this.actualPixels, this.expectedPixels);
    });

    it('generates a CSS file with alt-diagonal coordinates', function () {
      var actualCss = fs.readFileSync(__dirname + '/actual-files/options/sprite.css', 'utf8');
      var expectedCss = fs.readFileSync(__dirname + '/expected-files/options/sprite.css', 'utf8');
      assert.strictEqual(actualCss, expectedCss);
    });
  });

  describe('running a task with a custom CSS template', function () {
    childUtils.run('gulp sprite-template');
    imageUtils.loadActual(__dirname + '/actual-files/template/sprite.png');
    imageUtils.loadExpected(__dirname + '/expected-files/template/mint-graphicsmagick.png');

    it('generates a top-down png', function () {
      assert.deepEqual(this.actualPixels, this.expectedPixels);
    });

    it('generates a css file', function () {
      var actualCss = fs.readFileSync(__dirname + '/actual-files/template/sprite.scss', 'utf8');
      var expectedCss = fs.readFileSync(__dirname + '/expected-files/template/sprite.scss', 'utf8');
      assert.strictEqual(actualCss, expectedCss);
    });
  });

  describe('running a task with a custom spritesheet prefix', function () {
    childUtils.run('gulp sprite-spritesheet-name');

    it('generates a css file', function () {
      var actualCss = fs.readFileSync(__dirname + '/actual-files/spritesheet-name/sprite.scss', 'utf8');
      var expectedCss = fs.readFileSync(__dirname + '/expected-files/spritesheet-name/sprite.scss', 'utf8');
      assert.strictEqual(actualCss, expectedCss);
    });
  });

  describe('running a task with mapped retina options', function () {
    childUtils.run('gulp sprite-retina-mapped');

    it('generates a mapped css file', function () {
      var actualCss = fs.readFileSync(__dirname + '/actual-files/retina-mapped/sprite.scss', 'utf8');
      var expectedCss = fs.readFileSync(__dirname + '/expected-files/retina-mapped/sprite.scss', 'utf8');
      assert.strictEqual(actualCss, expectedCss);
    });
  });

  // DEV: `gulp-newer` presents no input files when the task does not need to be run. See #17
  describe('running a task with no input images', function () {
    childUtils.run('gulp sprite-empty');

    it('does not generate a top-down png', function () {
      var imgExists = fs.existsSync(__dirname + '/actual-files/empty/sprite.png');
      assert.strictEqual(imgExists, false);
    });

    it('does not generate a css file', function () {
      var cssExists = fs.existsSync(__dirname + '/actual-files/empty/sprite.scss');
      assert.strictEqual(cssExists, false);
    });
  });
});
