module.exports = function (err, req, res, next) {
  console.log('ERROR IS: ', err.stack);
  res.status(500);
};
