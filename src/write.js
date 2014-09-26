module.exports = write;

var fse = require('fs-extra');

function write(_path, content, options, cb, self) {
  if (!cb) { return write(_path, content, {}, options, this); }

  if (!self) { self = this; }

  var absPath = self.pathHelper.absolutePath(_path);
  var relPath = self.pathHelper.relativePath(absPath);

  fse.writeFile(absPath, content, function(err) {
    if (err) { return cb(err); }

    cb(null);
  });
}
