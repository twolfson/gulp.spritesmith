var through = require('through');

// TODO: Rough proof of concept - Send back a first image and some text

function gulpSpritesmith(params) {
  var images = [];
  function handleImage(file) {
    var filepath = file.path;
    if (filepath) {
      images.push(filepath);
    }
  }

  function generateOutput() {
    console.log('def', images);
  }

  var retVal = through(handleImage, generateOutput);
  retVal.x = 2;
  return retVal;
}

module.exports = gulpSpritesmith;