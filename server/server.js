require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require("cookie-parser");
const mongoose = require('mongoose');
const cors = require('cors');
const authentication = require('./api/authentication');

const app = express();
app.use(bodyParser.json());
app.use(cookieParser());
app.use(cors({ origin: 'http://localhost:3000', credentials: true }));

const PORT = process.env.PORT || 3010;

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.CONNECTION_STRING);
  } catch (error) {
    console.log(error);
  }
};

mongoose.connection.once('open', () => {
  app.listen(PORT, () => {
    console.log(`Server is running on PORT: ${PORT}`);
  });
});

app.use(authentication);

connectDB();
