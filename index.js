// var app = require('express')();
var fs = require('fs');
var http = require('http');
var server = http.createServer(handler);
var io = require('socket.io')(server);
var index = fs.readFileSync(__dirname + '/index.html');

function handler(req,res){
  res.end(index);
}
// app.get('/', function(req, res){
//   res.sendFile(__dirname + '/index.html');
// });

io.on('connection', manageConnection);

function manageConnection(socket){
  console.log('a user connected');
  socket.on('disconnect', function(){
    console.log('user disconnected');
  });
  socket.on('chat message in',function(msg){
    console.log('message: ',msg);
    io.emit('chat message out', msg);
  });
}

server.listen(3000, function(){
  console.log('listening on *:3000');
});
