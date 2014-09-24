module.exports = list;

function list(_path, options, cb) {
  if (!cb) { return list(_path, {}, options); }
}
