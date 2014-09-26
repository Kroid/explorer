module.exports = remove;

var fse = require('fs-extra');

function remove(_path, options, cb, self) {
  if (!cb) { return remove(_path, {}, options, this); }

  if (!self) { self = this; }

  var absPath = self.pathHelper.absolutePath(_path);
  var relPath = self.pathHelper.relativePath(absPath);

  fse.remove(absPath, function() {
    cb(null);
  })
}
