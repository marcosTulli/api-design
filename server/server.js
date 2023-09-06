const express = require('express');
const app = express();
const _ = require('lodash');
const lionsRouter = require('./lions');
const tigersRouter = require('./tigers');

const port = 3000;

app.use(express.static('client'));
app.use(express.json());
app.use('/lions', lionsRouter);
app.use('/tigers', tigersRouter);

app.use((err, req, res, next) => {
  if (err) {
    console.log(err);
    res.status.send(err);
  }
});

app.listen(port, () => {
  console.log('Running on port: ', port);
});
