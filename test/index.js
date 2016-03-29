import IRKit from '../lib'
import http from 'http'
import querystring from 'querystring'
import assert from 'assert'

var server = http.createServer((req, res) => {
  if ( req.url === '/1/messages' && req.method === 'POST' ) {
    let body = '';
    req.on('data', (chunk) => body += chunk.toString());
    req.on('end', () => {
      body = querystring.parse(body);
      if ( body.clientkey && body.deviceid && body.message ) {
        let message = JSON.parse( body.message );
        if ( message && Array.isArray( message.data ) ) {
          res.end();
        }
      }
    });
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
    irkit.send(signal).then(() => {
      assert.ok(true);
      done();
    });
  });

});
