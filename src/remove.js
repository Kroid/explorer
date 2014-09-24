module.exports = remove;

function remove(_path, options, cb) {
  if (!cb) { return remove(_path, {}, options); }
}
