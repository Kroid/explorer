module.exports = Helper;


var path = require('path');


function Helper(basePath, isolate) {
  this.basePath = basePath || '/';
  this.isolate = isolate === undefined ? true : !!isolate;
}


Helper.prototype._prepareRelative = _prepareRelative;

Helper.prototype.absolutePath = absolutePath;
Helper.prototype.relativePath = relativePath;




function absolutePath(_path) {
  _path = path.join(this.basePath, _path);

  var rel = this._prepareRelative(_path, this.basePath),
      abs = rel === null ? null : path.join(this.basePath, rel);

  return abs;
}


function relativePath(_path) {
  var rel = this._prepareRelative(_path);
  return rel;
}





function _prepareRelative(_path) {
  _path = path.normalize(_path);

  var rel = path.relative(this.basePath, _path),
      relArr = rel.split(path.sep);

  if (this.isolate && relArr[0] === '..') { return null; }
  return rel;
}
