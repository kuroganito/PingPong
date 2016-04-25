
var express = require('express');
var app = express();
var localSockets = [];

app.use(express.static('public'));

var io = require('socket.io')(
  app.listen(3000, function () {
    console.log('Listening on port 3000!');
  })
);

io.on('connection', function (socket) {
  localSockets.push(socket);

  socket.on('move-y', function (data) {
    var self = this;
    localSockets.forEach(function(s){
      if(s!==self){
        s.emit("move-y",data);
      }
    })

  });
});
