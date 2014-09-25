module.exports = list;

var fs = require('fs'),
    path = require('path'),
    _ = require('lodash');


function list(_path, options, cb, self) {
  if (!cb) { return list(_path, {}, options, this); }

  if (!self) { self = this; }

  var absPath = self.pathHelper.absolutePath(_path);
  var relPath = self.pathHelper.relativePath(absPath);

  fs.readdir(absPath, function(err, arr) {
    if (err) { return cb(err); }

    var result = [];

    var done = _.after(arr.length, function() {
      cb(null, result);
    });

    _.forEach(arr, function(ele) {
      fs.stat(path.join(absPath, ele), function(err, stats) {
        if(err) { return cb(err); }

        var obj = {
          path: _path,
          name: ele
        };

        if (stats.isDirectory()) { obj.type = "directory"; }
        if (stats.isFile()) { obj.type = "file"; }

        result.push(obj);
        done();
      });
    });
  })
}
