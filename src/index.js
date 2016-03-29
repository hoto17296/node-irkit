import Request from 'request'
import Promise from 'promise'

class IRKit {

  constructor(opts = {}) {
    this.clientKey = opts.clientKey || process.env.IRKIT_CLIENT_KEY;
    this.deviceId  = opts.deviceId  || process.env.IRKIT_DEVICE_ID;
    this.apiUrl    = opts.apiUrl    || process.env.IRKIT_API_URL || 'https://api.getirkit.com/1';
  }

  available() {
    return ( this.clientKey && this.deviceId && this.apiUrl );
  }

  send(signal) {
    return new Promise((resolve, reject) => {
      if ( typeof signal === 'string' || signal instanceof String ) {
        signal = JSON.parse(signal);
      }
      if ( typeof signal !== 'object' ) {
        return reject('Invalid signal.');
      }
      if ( ! this.available() ) {
        return reject('IRKit is unavailable.');
      }
      var params = {
        url: this.apiUrl + '/messages',
        form: {
          clientkey: this.clientKey,
          deviceid:  this.deviceId,
          message:   JSON.stringify(signal),
        }
      };
      Request.post(params, (err) => {
        if ( err ) {
          console.error(err);
          return reject('Failed to connect IRKit API.');
        }
        resolve();
      });
    });
  }

}

export default IRKit
module.exports = IRKit
