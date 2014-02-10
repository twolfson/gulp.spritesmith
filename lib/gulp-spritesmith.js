var through = require('through');

function gulpSpritesmith(params) {
  function handleImage(img) {
    console.log('wat', arguments);
  }

  function generateOutput() {
    console.log('def', arguments);
  }

  var retVal = through(handleImage, generateOutput);
  retVal.x = 2;
  return retVal;
}

module.exports = gulpSpritesmith;