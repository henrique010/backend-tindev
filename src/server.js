const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const server = express();

mongoose.connect('mongodb+srv://projects:projects@cluster0-uxlnd.mongodb.net/tindev?retryWrites=true&w=majority', 
{
    useNewUrlParser: true
});

server.use(cors());
server.use(express.json());
server.use(require('./routes'));

server.listen(3333, () => {
    console.log('sevidor rodando...');
});