// TODO: user app.params to find the lion using the id
// and then attach the lion to the req object and call next. Then in
// '/lion/:id' just send back req.lion

// create a middleware function to catch and handle errors, register it
// as the last middleware on app

// create a route middleware for POST /lions that will increment and
// add an id to the incoming new lion object on req.body

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
