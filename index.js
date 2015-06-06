var express = require('express');
var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var path = require('path');
var util = require('util');

app.use("/public", express.static(path.join(__dirname, 'public')));

app.get('/', function(req, res) {
  res.sendFile('index.html', {
    root: __dirname
  });
});

io.on('connection', function(socket) {
  console.log('a user connected : ' + socket.handshake.address);
  io.to('ui').emit('new_detector', {
    socketId: socket.id
  });

  socket.on('ui', function() {
    socket.join('ui');
    console.log('joined ui: ' + socket.id);
  });

  socket.on('new_loc', function(msg) {
    console.log('message: ' + JSON.stringify(msg));
    io.to('ui').emit('new_loc', {
      deviceId: msg.deviceId,
      socketId: socket.id
    });
  });

  socket.on('disconnect', function() {
    console.log('user disconnected : ' + socket.handshake.address);
    io.to('ui').emit('disconnect_detector', {
      socketId: socket.id
    });
  });
});


http.listen(3000, function() {
  console.log('listening on *:3000');
});
