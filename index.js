var express = require('express');
var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var path = require('path');

app.use("/public", express.static(path.join(__dirname, 'public')));


app.get('/', function(req, res){
  res.sendFile('index.html', { root: __dirname });
});

io.on('connection', function(socket){
  console.log('a user connected');
});

http.listen(3000, function(){
  console.log('listening on *:3000');
});
