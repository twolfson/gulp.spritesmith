var assert = require('assert');
var path = require('path');
var Readable = require('stream').Readable;
var Writable = require('stream').Writable;
var _ = require('underscore');
var gutil = require('gulp-util');
var json2css = require('json2css');
var spritesmith = require('spritesmith');
var url = require('url2');

function ExtFormat() {
  this.formatObj = {};
}
ExtFormat.prototype = {
  'add': function (name, val) {
    this.formatObj[name] = val;
  },
  'get': function (filepath) {
    // Grab the extension from the filepath
    var ext = path.extname(filepath),
        lowerExt = ext.toLowerCase();

    // Look up the file extenion from our format object
    var formatObj = this.formatObj,
        format = formatObj[lowerExt];
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

// Create a gulp-spritesmith function
function gulpSpritesmith(params) {
  var imgName = params.imgName;
  var cssName = params.cssName;
  assert(imgName, 'An `imgName` parameter was not provided to `gulp-spritesmith` (required)');
  assert(cssName, 'A `cssName` parameter was not provided to `gulp-spritesmith` (required)');

  var images = [];

  // TODO: Relocate logic into class?

  // Create a stream to take in images
  var spriteData = new Writable({objectMode: true});
  spriteData._write = function (file, encoding, cb) {
    var filepath = file.path;
    if (filepath) {
      images.push(filepath);
    }
    cb();
  };

  // Define our output streams
  spriteData.img = new Readable({objectMode: true});
  spriteData.img._read = function imgRead () {
    // Do nothing, let the `finish` handler take care of this
  };
  spriteData.css = new Readable({objectMode: true});
  spriteData.css._read = function cssRead () {
    // Do nothing, let the `finish` handler take care of this
  };

  // When we have completed our input
  spriteData.on('finish', function createSprite () {
    // Determine the format of the image
    var imgOpts = params.imgOpts || {};
    var imgFormat = imgOpts.format || imgFormats.get(imgName) || 'png';

    // Set up the defautls for imgOpts
    imgOpts = _.defaults({}, imgOpts, {'format': imgFormat});

    // Run through spritesmith
    var spritesmithParams = {
      'src': images,
      'engine': params.engine || 'auto',
      'algorithm': params.algorithm || 'top-down',
      'padding': params.padding || 0,
      'engineOpts': params.engineOpts || {},
      'exportOpts': imgOpts
    };
    spritesmith(spritesmithParams, function (err, result) {
      // If an error occurred, emit it
      if (err) {
        return spriteData.emit('error', err);
      }

      // Otherwise, write out the image
      spriteData.img.push(new gutil.File({
        path: imgName,
        contents: new Buffer(result.image, 'binary')
      }));

      // // Generate a listing of CSS variables
      // var coordinates = result.coordinates,
      //     properties = result.properties,
      //     spritePath = data.imgPath || url.relative(destCSS, destImg),
      //     cssVarMap = data.cssVarMap || function noop () {},
      //     cleanCoords = [];

      // // Clean up the file name of the file
      // Object.getOwnPropertyNames(coordinates).sort().forEach(function (file) {
      //   // Extract the image name (exlcuding extension)
      //   var fullname = path.basename(file),
      //       nameParts = fullname.split('.');

      //   // If there is are more than 2 parts, pop the last one
      //   if (nameParts.length >= 2) {
      //     nameParts.pop();
      //   }

      //   // Extract out our name
      //   var name = nameParts.join('.'),
      //       coords = coordinates[file];

      //   // Specify the image for the sprite
      //   coords.name = name;
      //   coords.source_image = file;
      //   coords.image = spritePath;
      //   coords.total_width = properties.width;
      //   coords.total_height = properties.height;

      //   // Map the coordinates through cssVarMap
      //   coords = cssVarMap(coords) || coords;

      //   // Save the cleaned name and coordinates
      //   cleanCoords.push(coords);
      // });

      // var cssFormat = 'spritesmith-custom',
      //     cssOptions = data.cssOpts || {};

      // // If there's a custom template, use it
      // if (cssTemplate) {
      //   if (typeof cssTemplate === 'function') {
      //     json2css.addTemplate(cssFormat, cssTemplate);
      //   } else {
      //     json2css.addMustacheTemplate(cssFormat, fs.readFileSync(cssTemplate, 'utf8'));
      //   }
      // } else {
      // // Otherwise, override the cssFormat and fallback to 'json'
      //   cssFormat = data.cssFormat || cssFormats.get(destCSS) || 'json';
      // }

      // // Render the variables via json2css
      // var cssStr = json2css(cleanCoords, {'format': cssFormat, 'formatOpts': cssOptions});

      // // Write it out to the CSS file
      // var destCSSDir = path.dirname(destCSS);
      // grunt.file.mkdir(destCSSDir);
      // fs.writeFileSync(destCSS, cssStr, 'utf8');

      // // Fail task if errors were logged.
      // if (that.errorCount) { cb(false); }

      // // Otherwise, print a success message.
      // grunt.log.writeln('Files "' + destCSS + '", "' + destImg + '" created.');

      // // Callback
      // cb(true);
    });
  });

  // Return out input stream with 2 outputs
  return spriteData;
}

module.exports = gulpSpritesmith;