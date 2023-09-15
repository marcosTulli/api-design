const morgan = require('morgan');
const exprpress = require('express');
// setup global middleware here

module.exports = (app) => {
  app.use(morgan('dev'));
  app.use(exprpress.json());
};
