// Load our dependencies
var assert = require('assert');
var async = require('async');
var fs = require('fs');
var path = require('path');
var _ = require('underscore');
var gutil = require('gulp-util');
var Minimatch = require('minimatch').Minimatch;
var templater = require('spritesheet-templates');
var Spritesmith = require('spritesmith');
var through2 = require('through2');
var url = require('url2');

function ExtFormat() {
  this.formatObj = {};
}
ExtFormat.prototype = {
  add: function (name, val) {
    this.formatObj[name] = val;
  },
  get: function (filepath) {
    // Grab the extension from the filepath
    var ext = path.extname(filepath);
    var lowerExt = ext.toLowerCase();

    // Look up the file extenion from our format object
    var formatObj = this.formatObj;
    var format = formatObj[lowerExt];
    return format;
  }
};

// Create img and css formats
var imgFormats = new ExtFormat();
var cssFormats = new ExtFormat();

// Add our img formats
imgFormats.add('.png', 'png');
imgFormats.add('.jpg', 'jpeg');
imgFormats.add('.jpeg', 'jpeg');

// Add our css formats
cssFormats.add('.styl', 'stylus');
cssFormats.add('.stylus', 'stylus');
cssFormats.add('.sass', 'sass');
cssFormats.add('.scss', 'scss');
cssFormats.add('.less', 'less');
cssFormats.add('.json', 'json');
cssFormats.add('.css', 'css');

// Copy/paste helper from gulp
// https://github.com/wearefractal/glob-stream/blob/v5.0.0/index.js#L131-L138
function unrelative(cwd, glob) {
  var mod = '';
  if (glob[0] === '!') {
    mod = glob[0];
    glob = glob.slice(1);
  }
  return mod + path.resolve(cwd, glob);
}

// Define helper for coordinate naming
function getCoordinateName(filepath) {
  // Extract the image name (exlcuding extension)
  var fullname = path.basename(filepath);
  var nameParts = fullname.split('.');

  // If there is are more than 2 parts, pop the last one
  if (nameParts.length >= 2) {
    nameParts.pop();
  }

  // Return our modified filename
  return nameParts.join('.');
}

// Create a gulp-spritesmith function
function gulpSpritesmith(params) {
  var imgName = params.imgName;
  var cssName = params.cssName;
  assert(imgName, 'An `imgName` parameter was not provided to `gulp.spritesmith` (required)');
  assert(cssName, 'A `cssName` parameter was not provided to `gulp.spritesmith` (required)');

  // If there are settings for retina, verify our all of them are present
  var retinaSrcFilter = params.retinaSrcFilter;
  var retinaImgName = params.retinaImgName;
  if (retinaSrcFilter || retinaImgName) {
    assert(retinaSrcFilter && retinaImgName, 'Retina settings detected. We must have both `retinaSrcFilter` and ' +
      '`retinaImgName` provided for retina to work');
  }

  // Define our output streams
  var imgStream = through2.obj();
  var cssStream = through2.obj();

  // Create a stream to take in images
  var images = [];
  var onData = function (file, encoding, cb) {
    images.push(file);
    cb();
  };

  // When we have completed our input
  var onEnd = function (cb) {
    // If there are no images present, exit early
    // DEV: This is against the behavior of `spritesmith` but pro-gulp
    // DEV: See https://github.com/twolfson/gulp.spritesmith/issues/17
    if (images.length === 0) {
      imgStream.push(null);
      cssStream.push(null);
      return cb();
    }

    // Determine the format of the image
    var imgOpts = params.imgOpts || {};
    var imgFormat = imgOpts.format || imgFormats.get(imgName) || 'png';

    // Set up the defautls for imgOpts
    imgOpts = _.defaults({}, imgOpts, {format: imgFormat});

    // If we have retina settings, filter out the retina images
    var retinaImages;
    if (retinaSrcFilter) {
      // Filter out our retina files
      // https://github.com/wearefractal/glob-stream/blob/v5.0.0/index.js#L84-L87
      retinaImages = [];
      var retinaSrcPatterns = Array.isArray(retinaSrcFilter) ? retinaSrcFilter : [retinaSrcFilter];
      images = images.filter(function filterSrcFile (file) {
        // If we have a retina file, filter it out
        var matched = retinaSrcPatterns.some(function matchMinimatches (retinaSrcPattern) {
          var minimatch = new Minimatch(unrelative(file.cwd, retinaSrcPattern));
          return minimatch.match(file.path);
        });
        if (matched) {
          retinaImages.push(file);
          return false;
        // Otherwise, keep it in the src files
        } else {
          return true;
        }
      });

      // If we have a different amount of normal and retina images, complain and leave
      if (images.length !== retinaImages.length) {
        var err = new Error('Retina settings detected but ' + retinaImages.length + ' retina images were found. ' +
          'We have ' + images.length + ' normal images and expect these numbers to line up. ' +
          'Please double check `retinaSrcFilter`.');
        err.images = images;
        err.retinaImages = retinaImages;
        this.emit('error', err);
        imgStream.push(null);
        cssStream.push(null);
        return cb();
      }
    }

    // Prepare spritesmith parameters
    var spritesmithParams = {
      engine: params.engine,
      algorithm: params.algorithm,
      padding: params.padding || 0,
      algorithmOpts: params.algorithmOpts || {},
      engineOpts: params.engineOpts || {},
      exportOpts: imgOpts
    };
    var that = this;

    // Construct our spritesmiths
    var spritesmith = new Spritesmith(spritesmithParams);
    var retinaSpritesmithParams;
    var retinaSpritesmith;
    if (retinaImages) {
      retinaSpritesmithParams = _.defaults({
        padding: spritesmithParams.padding * 2
      }, spritesmithParams);
      retinaSpritesmith = new Spritesmith(retinaSpritesmithParams);
    }

    // In parallel
    async.parallel([
      // Load in our normal images
      function generateNormalImages (callback) {
        spritesmith.createImages(images, callback);
      },
      // If we have retina images, load them in as well
      function generateRetinaSpritesheet (callback) {
        if (retinaImages) {
          retinaSpritesmith.createImages(retinaImages, callback);
        } else {
          process.nextTick(callback);
        }
      }
    ], function handleImages (err, resultArr) {
      // If an error occurred, emit it
      if (err) {
        return cb(err);
      }

      // Otherwise, validate our images line up
      var normalSprites = resultArr[0];
      var retinaSprites = resultArr[1];

      // If we have retina images, verify the widths line up
      if (retinaSprites) {
        // Perform our assertions
        var errorEncountered = false;
        normalSprites.forEach(function validateImageSizes (normalSprite, i) {
          var retinaSprite = retinaSprites[i];
          if (retinaSprite.width !== normalSprite.width * 2 || retinaSprite.height !== normalSprite.height * 2) {
            errorEncountered = true;
            var err = new Error('Normal sprite has inconsistent size with retina sprite. ' +
              '"' + images[i].path + '" is ' + normalSprite.width + 'x' + normalSprite.height + ' while ' +
              '"' + retinaImages[i].path + '" is ' + retinaSprite.width + 'x' + retinaSprite.height + '.');
            err.normalSprite = normalSprite;
            err.retinaSprite = retinaSprite;
            that.emit('error', err);
          }
        });

        // If there was an error, then bail out
        if (errorEncountered) {
          imgStream.push(null);
          cssStream.push(null);
          return cb();
        }
      }

      // Process our images now
      var result = spritesmith.processImages(normalSprites, spritesmithParams);
      var retinaResult;
      if (retinaSprites) {
        retinaResult = retinaSpritesmith.processImages(retinaSprites, retinaSpritesmithParams);
      }

      // START OF DUPLICATE CODE FROM grunt-spritesmith
      // Generate a listing of CSS variables
      var coordinates = result.coordinates;
      var properties = result.properties;
      var spritePath = params.imgPath || url.relative(cssName, imgName);
      var spritesheetData = {
        width: properties.width,
        height: properties.height,
        image: spritePath
      };
      var cssVarMap = params.cssVarMap || function noop () {};
      var cleanCoords = [];

      // Clean up the file name of the file
      Object.getOwnPropertyNames(coordinates).sort().forEach(function (file) {
        // Extract out our name
        var name = getCoordinateName(file);
        var coords = coordinates[file];

        // Specify the image for the sprite
        coords.name = name;
        coords.source_image = file;
        // DEV: `image`, `total_width`, `total_height` are deprecated as they are overwritten in `spritesheet-templates`
        coords.image = spritePath;
        coords.total_width = properties.width;
        coords.total_height = properties.height;

        // Map the coordinates through cssVarMap
        coords = cssVarMap(coords) || coords;

        // Save the cleaned name and coordinates
        cleanCoords.push(coords);
      });

      // If we have retina sprites
      var retinaCleanCoords;
      var retinaGroups;
      var retinaSpritesheetInfo;
      if (retinaResult) {
        // Generate a listing of CSS variables
        var retinaCoordinates = retinaResult.coordinates;
        var retinaProperties = retinaResult.properties;
        var retinaSpritePath = params.retinaImgPath || url.relative(cssName, retinaImgName);
        retinaSpritesheetInfo = {
          width: retinaProperties.width,
          height: retinaProperties.height,
          image: retinaSpritePath
        };
        // DEV: We reuse cssVarMap
        retinaCleanCoords = [];

        // Clean up the file name of the file
        Object.getOwnPropertyNames(retinaCoordinates).sort().forEach(function prepareRetinaTemplateData (file) {
          var name = getCoordinateName(file);
          var coords = retinaCoordinates[file];
          coords.name = name;
          coords.source_image = file;
          coords.image = retinaSpritePath;
          coords.total_width = retinaProperties.width;
          coords.total_height = retinaProperties.height;
          coords = cssVarMap(coords) || coords;
          retinaCleanCoords.push(coords);
        });

        // Generate groups for our coordinates
        retinaGroups = cleanCoords.map(function getRetinaGroups (normalSprite, i) {
          // Generate our group
          // DEV: Name is inherited from `cssVarMap` on normal sprite
          return {
            name: normalSprite.name,
            index: i
          };
        });
      }

      // If we have handlebars helpers, register them
      var handlebarsHelpers = params.cssHandlebarsHelpers;
      if (handlebarsHelpers) {
        Object.keys(handlebarsHelpers).forEach(function registerHelper (helperKey) {
          templater.registerHandlebarsHelper(helperKey, handlebarsHelpers[helperKey]);
        });
      }

      // If there is a custom template, use it
      var cssFormat = 'spritesmith-custom';
      var cssTemplate = params.cssTemplate;
      if (cssTemplate) {
        if (typeof cssTemplate === 'function') {
          templater.addTemplate(cssFormat, cssTemplate);
        } else {
          templater.addHandlebarsTemplate(cssFormat, fs.readFileSync(cssTemplate, 'utf8'));
        }
      // Otherwise, override the cssFormat and fallback to 'json'
      } else {
        cssFormat = params.cssFormat;
        if (!cssFormat) {
          cssFormat = cssFormats.get(cssName) || 'json';

          // If we are dealing with retina items, move to retina flavor (e.g. `scss` -> `scss_retina`)
          if (retinaGroups) {
            cssFormat += '_retina';
          }
        }
      }

      // Render the variables via `spritesheet-templates`
      var cssStr = templater({
        sprites: cleanCoords,
        spritesheet: spritesheetData,
        spritesheet_info: {
          name: params.cssSpritesheetName
        },
        retina_groups: retinaGroups,
        retina_sprites: retinaCleanCoords,
        retina_spritesheet: retinaSpritesheetInfo,
        retina_spritesheet_info: {
          name: params.cssRetinaSpritesheetName
        },
        retina_groups_info: {
          name: params.cssRetinaGroupsName
        }
      }, {
        format: cssFormat,
        formatOpts: params.cssOpts || {}
      });
      // END OF DUPLICATE CODE FROM grunt-spritesmith

      // Pipe out images as streams and forward their errors
      // TODO: Consider making joint stream default
      //   but allow for split stream which has more distinct errors
      //   e.g. spritesmith.split() = {css, img}
      result.image.on('error', function forwardImgError (err) {
        that.emit('error', err);
      });
      var imgFile = new gutil.File({
        path: imgName,
        contents: result.image
      });
      that.push(imgFile);
      imgStream.push(imgFile);
      if (retinaResult) {
        var retinaImgFile = new gutil.File({
          path: retinaImgName,
          contents: retinaResult.image
        });
        retinaResult.image.on('error', function forwardImgError (err) {
          that.emit('error', err);
        });
        that.push(retinaImgFile);
        imgStream.push(retinaImgFile);
      }

      // Close our image stream
      imgStream.push(null);

      // Output the CSS
      var cssFile = new gutil.File({
        path: cssName,
        contents: new Buffer(cssStr)
      });
      that.push(cssFile);
      cssStream.push(cssFile);
      cssStream.push(null);
      cb();
    });
  };

  // Return output stream with two sub-streams:
  // - master stream includes all files
  // - 'css' stream for css only
  // - 'img' stream for images only
  var retStream = through2.obj(onData, onEnd);
  retStream.css = cssStream;
  retStream.img = imgStream;
  return retStream;
}

module.exports = gulpSpritesmith;
