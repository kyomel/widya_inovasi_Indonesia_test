require('dotenv').config();
const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const app = express();

const router = require('./router');

app.use(morgan('tiny'))
app.use(cors());
app.use(express.json())

app.use('/api/v1', router)

module.exports = app;