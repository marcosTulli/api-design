const express = require('express');
const morgan = require('morgan');
const _ = require('lodash');
const app = express();
const router = require('./router');
// const tigersRouter = require('./tigers');
const lions = './lions.json';
const tigers = './tigers.json';

const PORT = 3000;

app.use(morgan('dev'));
app.use(express.static('client'));
app.use(express.json());
app.use('/lions', router(lions));
app.use('/tigers', router(tigers));

app.listen(PORT, () => {
  console.log('Running on PORT: ', PORT);
});
