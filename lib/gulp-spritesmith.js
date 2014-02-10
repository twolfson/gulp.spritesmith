var through = require('through');

function gulpSpritesmith(params) {
  function handleImage(img) {
    console.log('wat', arguments);
  }

  function generateOutput() {
    console.log('def', arguments);
  }

  return through(handleImage, generateOutput);
}

module.exports = gulpSpritesmith;