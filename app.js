// require modules
const express = require('express');
const app = express();
const morgan = require('morgan');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const path = require('path');

// file paths
const productRoutes = require('./routes/products');
const orderRoutes = require('./routes/orders');
const userRoutes = require('./routes/user');

// set up morgan and bodyParser
app.use(morgan('dev'));
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

// connect Mongodb
mongoose.connect('mongodb+srv://michaeldragomir:'+ process.env.MONGO_ATLAS_PW + '@data-1srnn.mongodb.net/test',
{
  userMongoClient: true
}
);

//remove the "decpreiated" message that appears in terminal when running server
mongoose.Promise = global.Promise;

// set up middleware that handles incoming requests
app.use('/products', productRoutes);
app.use('/orders', orderRoutes);
app.use('/user', userRoutes);
app.use('/uploads', express.static('uploads'));

// set up error messages if no routes exist to handle incoming requests
app.use((req, res, next) => {
  const error = new Error("Not found");
  error.status = 404;
  next(error);
});

app.use((error, req, res, next) => {
  res.status(error.status || 500);
  res.json({
    error: {
      message: error.message
    }
  });
});

// Overide CORS by giving access to server from different clients.
app.use((req, res, next) => {
  res.header('Acess-Control-Allow-Origin', '*');
  res.header('Acess-Control-Allow-Headers', '*');
  if (req.method === 'OPTIONS') {
    res.header('Acess-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');
    return res.status(200).json({});
  }
  next();
});

// export app module to server
module.exports = app;
