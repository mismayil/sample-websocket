var socket = io();

socket.on('hello', function(msg) {
  console.log(msg);
});

socket.emit('hello', 'Hello from client!');
