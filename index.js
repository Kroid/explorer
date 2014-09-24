module.exports = Explorer;

var PathHelper = require('./src/pathHelper');

function Explorer(basePath, isolate) {
  this.pathHelper = new PathHelper(basePath, isolate);
}

/* Create file or directory */
Explorer.prototype.create = require('./src/create');

/* Copy file or directory */
Explorer.prototype.copy = require('./src/copy');

/* Get list of files and directories by path */
Explorer.prototype.list = require('./src/list');

/* Get file content */
Explorer.prototype.read = require('./src/read');

/* Remove file or directory */
Explorer.prototype.remove = require('./src/remove');

/* Write data to file */
Explorer.prototype.write = ('./src/write');
