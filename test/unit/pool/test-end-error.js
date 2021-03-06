var assert = require('assert');
var common = require('../../common');
var pool   = common.createPool({port: common.fakeServerPort});

var server = common.createFakeServer();

server.listen(common.fakeServerPort, function (err) {
  assert.ifError(err);

  pool.end(function (err) {
    assert.ifError(err);

    pool.getConnection(function(err, connection) {
      assert.ok(err);
      assert.equal(err.code, 'POOL_CLOSED');
      assert.equal(connection, undefined);
      server.destroy();
    });
  });
});
