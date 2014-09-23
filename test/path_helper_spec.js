var assert = require('assert'),
    PathHelper = require('./../src/pathHelper');


describe('pathHelper', function() {
  var pathHelper;

  it('isolate mode, absolute path', function() {
    var pathHelper = new PathHelper('/foo/baz');

    assert.equal('/foo/baz', pathHelper.absolutePath(''));
    assert.equal('/foo/baz', pathHelper.absolutePath('/'));

    assert.equal('/foo/baz/bar', pathHelper.absolutePath('/bar'));
    assert.equal('/foo/baz/bar/file.md', pathHelper.absolutePath('bar/file.md'));
    assert.equal('/foo/baz/bar/file.md', pathHelper.absolutePath('/bar/file.md'));

    assert.equal(null, pathHelper.absolutePath('/.././../../'));
    assert.equal(null, pathHelper.absolutePath('../'));
    assert.equal(null, pathHelper.absolutePath('.././../..'));
    assert.equal(null, pathHelper.absolutePath('../../'));
  });

  it('isolate mode, relative path', function() {
    var pathHelper = new PathHelper('/foo/baz');

    assert.equal('', pathHelper.relativePath('/foo/baz'));
    assert.equal('bar', pathHelper.relativePath('/foo/baz/bar'));
    assert.equal('bar/file.md', pathHelper.relativePath('/foo/baz/bar/file.md'));

    assert.equal(null, pathHelper.relativePath('/'));
    assert.equal(null, pathHelper.relativePath(''));

    assert.equal(null, pathHelper.relativePath('/foo'));
    assert.equal(null, pathHelper.relativePath('/foo/baz/../'));

    assert.equal(null, pathHelper.relativePath('/../'));
    assert.equal(null, pathHelper.relativePath('/../../'));

    assert.equal(null, pathHelper.relativePath('./../../'));
    assert.equal(null, pathHelper.relativePath('./../'));
  });

  it('unisolate mode, absolute path', function() {
    var pathHelper = new PathHelper('/foo/baz', false);

    assert.equal('/foo/baz', pathHelper.absolutePath(''));
    assert.equal('/foo/baz', pathHelper.absolutePath('/'));

    assert.equal('/foo/baz/bar/file.md', pathHelper.absolutePath('bar/file.md'));
    assert.equal('/foo/baz/bar/file.md', pathHelper.absolutePath('/bar/file.md'));

    assert.equal('/foo', pathHelper.absolutePath('../'));
    assert.equal('/', pathHelper.absolutePath('../../'));
    assert.equal('/', pathHelper.absolutePath('../../.././..'));
  });

  it('unisolate mode, relative path', function() {
    var pathHelper = new PathHelper('/foo/baz', false);

    assert.equal('', pathHelper.relativePath('/foo/baz'));
    assert.equal('bar', pathHelper.relativePath('/foo/baz/bar'));
    assert.equal('bar/file.md', pathHelper.relativePath('/foo/baz/bar/file.md'));

    assert.notEqual('', pathHelper.relativePath(''));

    assert.equal('..', pathHelper.relativePath('/foo'));

    assert.equal('../..', pathHelper.relativePath('/'));
    assert.equal('../..', pathHelper.relativePath('/../../../../'));
  });

});
