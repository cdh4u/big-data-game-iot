var SerialPort = require('serialport');
var http = require('http');

var temp, night, rain, cloud, snow = 0;
var path = '/dev/ttyACM0';

var port = new SerialPort(path, {
  baudrate: 9600
});

//create a server object:
http.createServer(function (req, res) {
  console.log(req.headers);

  res.setHeader('Content-Type', 'application/json');
  res.setHeader('Access-Control-Allow-Origin', '*');

  res.write(JSON.stringify({main:{temp:temp, night:night, rain:rain, cloud:cloud, snow:snow}}));

  res.end(); //end the response
}).listen(8084); //the server object listens on port 8080


// Opens port and reads data
console.log(path);

// Open errors will be emitted as an error event
port.on('open', function() {
  console.log('Serial port is open');
})

// Open errors will be emitted as an error event
port.on('error', function(err) {
  console.log('Error: ', err.message);
})

// Reads and parses data
port.on('data', function(data) {
  var value = data.toString('utf8');
  var valueArray = value.split(":");

  temp = Math.round(valueArray[1]);
  
  if(valueArray[0] > 70) {
    if(temp > 0) {
      rain = 1;
      snow = 0;
    }

    else {
      snow = 1;
      rain = 0;
    }

    cloud = 50;
  }

  else {
    rain = 0;
    snow = 0;
    cloud = 0;
  }

  if(valueArray[2] < 700) {
    night = 1;
  }

  else {
    night = 0;
  }

  console.log("\n\nSENSOR VALUES: " + valueArray[0] + ", " + valueArray[1] + ", " + valueArray[2]);
  console.log("\nPARSED VALUES: \nTemperature: " + temp + "\nNight: " + night + "\nRain: " + rain + "\nSnow: " + snow + "\nCloud: " + cloud);
});
