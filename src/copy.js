module.exports = copy;

function copy(src, dest, options, cb) {
  if (!cb) { return copy(src, dest, {}, options); }
}
