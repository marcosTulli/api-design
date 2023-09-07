const express = require('express');
const morgan = require('morgan');
const _ = require('lodash');
const app = express();
const router = require('./router');
const lions = './db/lions.json';
const tigers = './db/tigers.json';

app.use(morgan('dev'));
app.use(express.static('client'));
app.use(express.json());
app.use('/lions', router(lions));
app.use('/tigers', router(tigers));

module.exports = app;
