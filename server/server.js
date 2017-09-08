const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');

const {generateMessage, generateLocationMessage} = require('./utils/message');
const {isRealString} = require('./utils/validation');
const {Users} = require('./utils/users');
const publicPath = path.join(__dirname, '../public');
const port = process.env.PORT || 3000;
let app = express();
let server = http.createServer(app);
let io = socketIO(server);
let users = new Users();

app.use(express.static(publicPath));

io.on('connection', (socket) => {
    console.log('New user connected');

    socket.on('join', (params, callback) => {
        if (!isRealString(params.name) || !isRealString(params.room)) {
            return callback('Name and room name are required.'); // to make sure below code not run
        }

        if (users.getUserByName(params.name)) {
            return callback('Username has already been taken');
        }
        
        let room = params.room.toLowerCase();

        socket.join(room);
        users.removeUser(socket.id); // remove user form any potential previous rooms
        users.addUser(socket.id, params.name, room);

        io.to(room).emit('updateUserList', users.getUserList(room));
        io.emit('updateRoomList', users.getRoomList());

        // socket.leave('The office fans');
        //
        // io.emit -> io.to('The office fans').emit
        // socket.broadcast.emit -> socket.broadcast.to('The office fans').emit
        // socket.emit 

        socket.emit('newMessage', generateMessage('Admin', 'Welcome to the chat app'));
        socket.broadcast.to(room).emit('newMessage', generateMessage('Admin', `${params.name} has joined.`));
        
        callback();
    });

    socket.on('createMessage', (message, callback) => {
        let user = users.getUserById(socket.id);

        if (user && isRealString(message.text)) {
            io.to(user.room).emit('newMessage', generateMessage(user.name, message.text));
        }
        
        callback(); // aknowledgement
    });

    socket.on('createLocationMessage', (coords) => {
        let user = users.getUserById(socket.id);

        if (user) {
            io.to(user.room).emit('newLocationMessage', generateLocationMessage(user.name, coords.latitude, coords.longitude));
        }
    });

    socket.on('disconnect', (reason) => {
        // console.log('User disconnected:', reason);
        let user = users.removeUser(socket.id);

        if (user) {
            io.to(user.room).emit('updateUserList', users.getUserList(user.room));
            io.to(user.room).emit('newMessage', generateMessage('Admin', `${user.name} has left.`));
            io.emit('updateRoomList', users.getRoomList());
        }
    });

    socket.on('newUserConnected', () => {
        socket.emit('updateRoomList', users.getRoomList());
    });
});

server.listen(port, () => {
    console.log(`Server is listening on port ${port}`);
});