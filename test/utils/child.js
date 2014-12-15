// Load in dependencies
var exec = require('child_process').exec;

// Define our execution helper
exports.run = function (cmd) {
  before(function runFn (done) {
    exec(cmd, function (err, stdout, stderr) {
      if (!err && stderr) {
        err = new Error(stderr);
      }
      done(err);
    });
  });
};
