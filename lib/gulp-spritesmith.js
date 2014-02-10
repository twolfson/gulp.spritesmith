var through = require('through');

// TODO: Rough proof of concept - Send back a first image and some text

function gulpSpritesmith(params) {
  var images = [];
  var image;
  function handleImage(file) {
    var filepath = file.path;
    if (filepath) {
      images.push(filepath);
    }
    image = file;
  }

  function generateOutput() {
    console.log('def', images);
    this.emit('data', image);
    this.emit('end');
  }

  var retVal = through(handleImage, generateOutput);
  retVal.x = 2;
  return retVal;
}

module.exports = gulpSpritesmith;