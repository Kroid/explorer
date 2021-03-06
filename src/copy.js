module.exports = copy;

var fse = require('fs-extra');

function copy(src, dest, options, cb, self) {
  if (!cb) { return copy(src, dest, {}, options, this); }

  if (!self) { self = this; }

  var absPathSrc = self.pathHelper.absolutePath(src);
  var relPathSrc = self.pathHelper.relativePath(absPathSrc);

  var absPathDest = self.pathHelper.absolutePath(dest);
  var relPathDest = self.pathHelper.relativePath(absPathDest);

  fse.copy(absPathSrc, absPathDest, function(err) {
    if (err) { return cb(err); }

    cb(null, {
      src: relPathSrc,
      dest: relPathDest
    });
  });
}
