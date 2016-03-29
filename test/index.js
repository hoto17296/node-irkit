import IRKit from '../lib';
import assert from 'assert';

describe('IRKit', () => {
  var irkit;

  before(() => {
    irkit = new IRKit({
      clientKey: 'xxx',
      deviceId:  'xxx',
    });
  });

  it('is available', () => {
    assert.ok( irkit.available() );
  });

});
