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

    explorer.create('/create/file.md', function(err, data) {
      assert.equal(true, !err);

      fs.exists(path.join(basePath, '/create/file.md'), function(exists) {
        assert.equal(true, exists);

        fs.stat(path.join(basePath, '/create/file.md'), function(err, stat) {
          assert.equal(true, !err);
          assert.equal(true, stat.isFile());

          assert.equal('file', data.type);
          assert.equal('create/file.md', data.path);

          done();
        });
      });
    });
  });

  it('Should create directory', function(done) {
    explorer = new Explorer(basePath);

    explorer.create('/create/directory', {type: 'directory'}, function(err, data) {
      assert.equal(true, !err);

      fs.exists(path.join(basePath, '/create/directory'), function(exists) {
        assert.equal(true, exists);

        fs.stat(path.join(basePath, '/create/directory'), function(err, stat) {
          assert.equal(true, !err);
          assert.equal(true, stat.isDirectory());

          assert.equal('directory', data.type);
          assert.equal('create/directory', data.path);

          done();
        });
      });
    });
  });

  it('Should read file', function(done) {
    explorer = new Explorer(basePath);

    explorer.read('read/README.md', function(err, data) {
      assert.equal(true, !err);
      assert.equal('some data', data.content);

      done();
    })
  });

  it('Should error on read directory', function(done) {
    explorer = new Explorer(basePath);

    explorer.read('read/unreadable', function(err, data) {
      assert.equal(true, !!err);
      assert.equal(true, !data);

      done();
    })
  });

  it('Should get list of files and directories', function(done) {
    explorer = new Explorer(basePath);

    explorer.list('list', function(err, res) {
      assert.equal(true, !err)
      assert.equal(4, res.length);

      var count = 4;
      res.map(function(file) {
        if (file.type === 'file') {
          if (file.name === 'fileA' && file.path === 'list') {
            count--;
          }
          if (file.name === 'fileB.md' && file.path === 'list') {
            count--;
          }
        }

        if (file.type === 'directory') {
          if (file.name === 'dirA' && file.path === 'list') {
            count--;
          }
          if (file.name === 'dirB.qwe' && file.path === 'list') {
            count--;
          }
        }
      });

      assert.equal(0, count);

      done();
    });
  });

  it('Should copy directory with files', function(done) {
    explorer = new Explorer(basePath);

    explorer.copy('copy/src/dir', 'copy/dest/dir', function(err, data) {
      assert.equal(true, !err);

      fs.exists(path.join(basePath, 'copy/dest/dir/file'), function(exists) {
        assert.equal(true, exists);
        fs.exists(path.join(basePath, 'copy/dest/dir/anotherFile'), function(exists) {
          assert.equal(true, exists);
          done();
        });
      });
    });
  });

  it('Should move directory with files', function(done) {
    explorer = new Explorer(basePath);

    explorer.move('move/src/dir', 'move/dest/dir', function(err, data) {
      assert.equal(true, !err);

      fs.exists(path.join(basePath, 'move/dest/dir/file'), function(exists) {
        assert.equal(true, exists);
        fs.exists(path.join(basePath, 'move/dest/dir/anotherFile'), function(exists) {
          assert.equal(true, exists);
          done();
        });
      });
    });
  });

  it('Should remove directory with files', function(done) {
    explorer = new Explorer(basePath);

    explorer.remove('remove/dir', function(err) {
      assert.equal(true, !err);

      fs.exists(path.join(basePath, 'remove/dir'), function(exists) {
        assert.equal(false, exists);
        done();
      });
    });
  });

  it('Should write content to file', function(done) {
    explorer = new Explorer(basePath);

    explorer.write('write/file', 'some data', function(err) {
      assert.equal(true, !err);

      fs.readFile(path.join(basePath, 'write/file'), {encoding: 'utf-8'}, function(err, content) {
        assert.equal(true, !err);

        assert.equal('some data', content);

        done();
      });
    });
  });
});
