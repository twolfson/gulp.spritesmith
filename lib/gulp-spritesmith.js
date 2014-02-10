var Writable = require('stream').Writable;

// TODO: Rough proof of concept - Send back a first image and some text


function gulpSpritesmith(params) {
  var images = [];
  var image;
  // TODO: Relocate writable into class?
  var inputStream = new Writable({
    objectMode: true
  });
  inputStream._write = function (file) {
    console.log(file);
    var filepath = file.path;
    if (filepath) {
      images.push(filepath);
    }
    image = file;
  };

  function generateOutput() {
    console.log('def', images);
    this.emit('data', image);
    this.emit('end');
  }

  // var retVal = through(handleImage, generateOutput);
  // retVal.x = 2;
  return inputStream;
}

module.exports = gulpSpritesmith;