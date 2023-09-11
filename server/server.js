const express = require('express');
const app = express();
const api = require('./api/api');
const error = require('./middleware/error');

// setup the app middlware
require('./middleware/appMiddlware')(app);

// setup the api
app.use('/api/', api);
// set up global error handling
app.use(error);

// export the app for testing
module.exports = app;
