const express = require('express');
const socketio = require('socket.io');

const app = express();


const server = app.listen(3000, () => {
  console.log('Socket Server is running on port 3000');
});

const io = socketio(server); // io is the socket server

// const admin = io.of('/')

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/views/chat.html');
});
app.get('/group-chat', (req, res) => {
    res.sendFile(__dirname + '/views/group_chat.html');
});

io.on('connection', (socket) => { // socket is the client
    console.log(`New socket connection: ${socket.id}`);
    socket.on('disconnect', (reason) => { // reason is the reason for disconnection
        console.log(`Client with ID [${socket.id}] disconnected: ${reason}`);
    });
    socket.on('message', (data) => {
        console.log(`Data from ${socket.id}: ${data}`);
        socket.send(`Hello from server!!`);
    });
    socket.on('chat_message', (data) => {
        data.senderId = socket.id;
        console.log(`${JSON.stringify(data)}`);
        // socket.emit('chat_message', data);
        socket.broadcast.emit('chat_message', data);
    });

    socket.on("group_message", (data) => {
        console.log(JSON.stringify(data));
        io.to(data.groupName).emit("group_message", data);
    });

    socket.on("join_group", (groupName) => {
        console.log(`Socket: ${socket.id} joined group: ${groupName}`); 
        socket.join(groupName);
    });

    socket.on("leave_group", (groupName) => {
        console.log(`Socket: ${socket.id} left group: ${groupName}`); 
        socket.leave(groupName);
    })
});
