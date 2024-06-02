const mongoose = require('mongoose');
const express = require('express');
const app = express();
const helmet = require('helmet');
const genres = require('./routes/genres');
const home = require('./routes/home');
const customers = require('./routes/customers');

mongoose
  .connect('mongodb://localhost:27017/movies-genres')
  .then(() => console.log('Connected to mongodb...'))
  .catch((err) => console.log('Could not connect to MongoDB...', err));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));
//Secure your app
app.use(helmet());

// Routes start with / will use home router
app.use('/', home);
// Routes start with /api/genres will use genres router
app.use('/api/genres', genres);
app.use('/api/customers', customers);

const port = process.env.PORT || 3000;

app.listen(port, () => console.log(`Listening on port: ${port}`));
