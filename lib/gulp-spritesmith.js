var Duplex = require('stream').Duplex;

function gulpSpritesmith(params) {
  return {
    img: new Duplex(),
    css: new Duplex()
  };
}

module.exports = gulpSpritesmith;