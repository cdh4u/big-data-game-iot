var path = '/dev/ttyS0';

var SerialPort = require('serialport');
var port = new SerialPort(path, {
  baudrate: 9600
});

console.log(path);

// Open errors will be emitted as an error event
port.on('open', function() {
  console.log('Serial port is open');
})

// Open errors will be emitted as an error event
port.on('error', function(err) {
  console.log('Error: ', err.message);
})

port.on('readline', function() {
  console.log('Data: ', port.read());
})
