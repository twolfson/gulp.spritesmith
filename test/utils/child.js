var exec = require('child_process').exec;

exports.run = function (cmd) {
  before(function (done) {
    exec(cmd, function (err, stdout, stderr) {
      if (!err && stderr) {
        err = new Error(stderr);
      }
      done(err);
    });
  });
};