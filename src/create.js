module.exports = create;

var fse = require('fs-extra');

function create(_path, options, cb, self) {
  if (!cb) { return create(_path, {type: 'file'}, options, this); }

  if (!self) { self = this; }

  var absPath = self.pathHelper.absolutePath(_path);
  var relPath = self.pathHelper.relativePath(absPath);

  if (options.type === 'file') {
    fse.ensureFile(absPath, function(err) {
      if (err) { return cb(err); }

      fse.readFile(absPath, {encoding: 'utf-8'}, function(err, content) {
        if (err) { return cb(err); }

        cb(null, {
          content: content,
          path: relPath,
          type: options.type
        });
      });
    })
  }

  if (options.type === 'directory' ) {
    fse.ensureDir(absPath, function(err) {
      if (err) { return cb(err); }

      cb(null, {
        path: relPath,
        type: options.type
      });
    });
  }
}
