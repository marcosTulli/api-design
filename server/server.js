const express = require('express');
const morgan = require('morgan');
// const _ = require('lodash');
const app = express();
const lionsRouter = require('./lions');
const tigersRouter = require('./tigers');

app.use(morgan('dev'));
app.use(express.static('client'));
app.use(express.json());
app.use('/lions', lionsRouter);
app.use('/tigers', tigersRouter);

module.exports = app;
