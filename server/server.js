const express = require('express');
const morgan = require('morgan');
require('dotenv').config({path: '../client/.env'});

const {MONGO_URI} = process.env;

console.log('MONGO_URI: ', MONGO_URI);

const PORT = 5678;

var app = express();

app.use(express.json());
app.use(morgan('dev'));
app.use(require('./routes'));

const server = app.listen(PORT, function () {
  console.log('listening on port ' + server.address().port);
});
