module.exports = move;

var fse = require('fs-extra');

function move(src, dest, options, cb, self) {
  if (!cb) { return move(src, dest, {}, options, this); }

  if (!self) { self = this; }

  var absPathSrc = self.pathHelper.absolutePath(src);
  var relPathSrc = self.pathHelper.relativePath(absPathSrc);

  var absPathDest = self.pathHelper.absolutePath(dest);
  var relPathDest = self.pathHelper.relativePath(absPathDest);

  fse.move(absPathSrc, absPathDest, function(err) {
    if (err) { return cb(err); }

    cb(null, {
      src: relPathSrc,
      dest: relPathDest
    });
  });
}