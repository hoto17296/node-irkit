# node-irkit
[![Build Status](https://travis-ci.org/hoto17296/node-irkit.svg?branch=master)](https://travis-ci.org/hoto17296/node-irkit)

A Node.js wrapper for IRKit Internet HTTP API.

## Installation
```
npm install irkit --save
```

## Usage

### Initialize
```
var IRKit = require('irkit');
var irkit = new IRKit({
  clientKey: 'XXXXXXXX',
  deviceId:  'XXXXXXXX',
});
```

To get `clientKey` and `deviceId`, see http://getirkit.com/#toc_6

### Send IR Signal
```
var signal = {
  format: 'raw',
  freq: 38,
  data: [ 1234, 567, 890, ... ],
};

irkit.send(signal);
```

To know more about IR Signal object, see http://getirkit.com/#toc_5

### Callback and ErrorHandling
`irkit.send` method returns Promise object.

```
irkit.send(signal)
  .then(function() { console.log('Send!'); })
  .catch(function(errMsg) { console.error(errMsg); });
```
