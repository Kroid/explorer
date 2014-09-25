module.exports = read;

var fse = require('fs-extra');

function read(_path, options, cb, self) {
  if (!cb) { return read(_path, {}, options, this); }

  if (!self) { self = this; }

  var absPath = self.pathHelper.absolutePath(_path);
  var relPath = self.pathHelper.relativePath(absPath);

  fse.stat(absPath, function(err, stat) {
    if (err) { return cb(err) }
    if (stat.isDirectory()) { return cb({error: relPath + ' is directory'}) }

    if (stat.isFile()) {
      fse.readFile(absPath, {encoding: 'utf-8'}, function(err, content) {
        if (err) { return cb(err); }

        cb(null, {
          content: content,
          path: relPath
        });
      });
      return;
    }
    cb({msg: 'undefined error'});
  });
}
