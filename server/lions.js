const _ = require('lodash');
const lionsRouter = require('express').Router();

const lions = [
  {
    'name': 'TONY',
    'pride': 'RAWRR',
    'age': '1',
    'gender': 'male',
    'id': '1',
  },
];
let id = 0;
const updateId = (req, res, next) => {
  if (!req.body.id) {
    id++;
    req.body['id'] = id.toString();
  }
  next();
};

lionsRouter.param('id', (req, res, next, id) => {
  const lion = _.find(lions, { id: id });
  if (lion) {
    res.json(lion);
    req.lion = lion;
    next();
  } else {
    res.send();
  }
});

lionsRouter
  .route('/')
  .get((req, res) => {
    res.json(lions);
  })
  .post(updateId, (req, res) => {
    const lion = req.body;
    lions.push(lion);
    res.json(lion);
  });

lionsRouter
  .route('/:id')
  .get((req, res) => {
    const lion = _.find(lions, { id: req.params.id });
    res.json(lion || {});
  })
  .put((req, res) => {
    const update = req.body;
    if (update.id) {
      delete update.id;
    }

    const lion = _.findIndex(lions, { id: req.params.id });
    if (!lions[lion]) {
      res.send();
    } else {
      const updatedLion = _.assign(lions[lion], update);
      res.json(updatedLion);
    }
  })
  .delete((req, res) => {
    const lion = _.findIndex(lions, { id: req.params.id });
    lions.splice(lion, 1);

    res.json(req.lion);
  });

module.exports = lionsRouter;
