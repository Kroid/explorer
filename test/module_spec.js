var assert = require('assert'),
    fs = require('fs'),
    path = require('path'),
    Explorer = require('./../index');

describe('Explorer functions', function() {
  var basePath,
      explorer;

  beforeEach(function(done) {
    basePath = path.join(__dirname, 'sandbox');
    done();
  });

  it('Should create file', function(done) {
    explorer = new Explorer(basePath);

    explorer.create('/create/file.md', function(data) {
      fs.exists(path.join(basePath, '/create/file.md'), function(exists) {
        assert(true, exists);

        fs.stat(path.join(basePath, '/create/file.md'), function(err, stat) {
          assert(true, stat.isFile());

          assert('file', data.type);
          assert('create/file.md', data.path);

          done();
        });
      });
    });
  });

  it('Should create directory', function(done) {
    explorer = new Explorer(basePath);

    explorer.create('/create/directory', {type: 'directory'}, function(data) {
      fs.exists(path.join(basePath, '/create/directory'), function(exists) {
        assert(true, exists);

        fs.stat(path.join(basePath, '/create/directory'), function(err, stat) {
          assert(true, stat.isDirectory());

          assert('directory', data.type);
          assert('create/directory', data.path);

          done();
        });
      });
    });
  });
});
