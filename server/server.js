require('dotenv').config();
const express = require('express');
const morgan = require('morgan');
const _ = require('lodash');
const app = express();
const lionsRouter = require('./lions');
const tigersRouter = require('./tigers');

const PORT = process.env.PORT;

app.use(morgan('dev'));
app.use(express.static('client'));
app.use(express.json());
app.use('/lions', lionsRouter);
app.use('/tigers', tigersRouter);

app.listen(PORT, () => {
  console.log('Running on PORT: ', PORT);
});
