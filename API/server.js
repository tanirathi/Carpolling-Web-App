require('dotenv').config();

const express = require('express');
const app = express();
const mongoose = require('mongoose');
const cors = require('cors');

mongoose.connect(process.env.DATABASE_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  });
const db = mongoose.connection;
db.on('error', (error) => console.error(error));
db.once('open', () => console.log('Connected to Database'));

app.use(express.json());
app.use(cors());

const ridesRouter = require('./routes/rides');
const profilesRouter = require('./routes/profiles');
const requestsRouter = require('./routes/requests');

app.use('/rides', ridesRouter);
app.use('/profiles', profilesRouter);
app.use('/requests', requestsRouter);

app.listen(3000, () => console.log('Server Started'));
