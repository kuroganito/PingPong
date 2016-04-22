
var express = require('express');
var app = express();


app.use(express.static('public'));

var io = require('socket.io')(
  app.listen(3000, function () {
    console.log('Listening on port 3000!');
  })
);

io.on('connection', function (socket) {

  console.log(io.sockets.sockets)
  /*socket.emit('news', { hello: 'world' });
  socket.on('my other event', function (data) {
    console.log(data);
  });*/
});
