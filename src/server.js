const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();

app.use(cors())

const server = require('http').Server(app);
const io = require('socket.io')(server);

io.on('connection', socket => {
    socket.on('connectRoom', user => {
        socket.join(user);
    });
});

mongoose.connect('mongodb+srv://projects:projects@cluster0-uxlnd.mongodb.net/tindev?retryWrites=true&w=majority',
    {
        useNewUrlParser: true
    });

app.use((req, res, next) => {
    req.io = io;

    return next();
});

app.use(express.json());
app.use(require('./routes'));

server.listen(3333, () => {
    console.log('sevidor rodando...');
});