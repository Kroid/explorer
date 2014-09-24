module.exports = read;

function read(_path, options, cb) {
  if (!cb) { return read(_path, {}, options); }
}
