'use strict';

let socket = io();

socket.on('ADD_USER', function(req) {
    if (req.status == 'SUCCESS') console.log('id=', req.id);
    else console.log('message=', req.message);
});

socket.emit('ADD_USER', {
    username: 'mismayil',
    firstname: 'Mahammad',
    lastname: 'Ismayilzada'
});
