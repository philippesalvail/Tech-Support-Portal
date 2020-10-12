'use strict';
const {MongoClient} = require('mongodb');
const assert = require('assert');
require('dotenv').config();

const {MONGO_URI} = process.env;

const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

const getClientAccount = async (req, res) => {
  res.status(200).send('I got the user');
};
