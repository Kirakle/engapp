const express = require('express');
const mongoose = require('mongoose');
//const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 5001;

//app.use(cors());
app.use(express.json({ extended: true }));
app.use('/', require('./routes/get.route'));

async function start() {
  try {
    await mongoose.connect('mongodb+srv://kirakle:qwert11.@cluster0.hjioope.mongodb.net/wordsDB');
    app.listen(PORT, () => {
      console.log('server started');
    });
  } catch (error) {
    console.log(error);
  }
}

start();

// useNewUrlParser: true,
// useUnifiedTopology: true,
// useCreateIndex: true,
// useFindAndModify: true,
