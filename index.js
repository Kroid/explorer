module.exports = Explorer;

var PathHelper = require('./src/pathHelper');

function Explorer(basePath, isolate) {
  this.pathHelper = new PathHelper(basePath, isolate);
}

/**
 *  Create file or directory
 *
 *  @param {string} relative path from basePath
 *  @param {object} type: 'file' or 'directory', default 'file'
 *  @param {function} callback
 *
 *  @returns {string} or {object} or {null}: error message
 *           {object}: path (relative from basePath),
 *                     type ('file' or 'directory'),
 *                     content (empty string if file don't exist before)
 */
Explorer.prototype.create = require('./src/create');

/* Copy file or directory */
Explorer.prototype.copy = require('./src/copy');

/**
 *  Get list of files and directories by path
 *
 *  @param {string} relative path from basePath
 *  @param {object} none
 *  @param {function} callback
 *
 *  @returns {string} or {object} or {null}: error message
 *           {object}: path (relative from basePath),
 *                     type ('file' or 'directory'),
 *                     name
 */
Explorer.prototype.list = require('./src/list');

/**
 *  Get file content or error if file not exist, if is dir, etc
 *
 *  @param {string} relative path from basePath
 *  @param {object} none
 *  @param {function} callback
 *
 *  @returns {string} or {object} or {null}: error message
 *           {object}: path (relative from basePath), content (empty string if file don't exist before)
 */
Explorer.prototype.read = require('./src/read');

/* Remove file or directory */
Explorer.prototype.remove = require('./src/remove');

/* Write data to file */
Explorer.prototype.write = ('./src/write');
