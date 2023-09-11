const router = require('express').Router();
const logger = require('../../util/logger');

// setup boilerplate route jsut to satisfy a request
// for building
router.route('/').get(function (req, res, next) {
  logger.log('Hey from user!!');
  res.send({ ok: true });
});

module.exports = router;
