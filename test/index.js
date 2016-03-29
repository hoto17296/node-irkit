import IRKit from '../lib'
import http from 'http'
import assert from 'assert'

var server = http.createServer((req, res) => {
  if ( req.url === '/1/messages' && req.method === 'POST' ) {
    res.end();
  }
});

const signal = {
  format: 'raw',
  freq: 38,
  data: [ 1234, 567, 890 ],
};

describe('IRKit', () => {
  var irkit;

  before((done) => {
    irkit = new IRKit({
      clientKey: 'xxx',
      deviceId:  'xxx',
      apiUrl: 'http://localhost:8888/1',
    });
    server.listen(8888, done);
  });

  it('is available', () => {
    assert.ok( irkit.available() );
  });

  it('can send signal', (done) => {
    var promise = irkit.send(signal);
    promise.then(() => {
      assert.ok(true);
      done();
    });
    promise.catch((err) => {
      console.log(err);
      assert.ok(false);
      done();
    });
  });

});
