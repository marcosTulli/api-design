const _ = require('lodash');
const tigersRouter = require('express').Router();

const tigers = [
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

tigersRouter.param('id', (req, res, next, id) => {
  const tiger = _.find(tigers, { id: id });
  if (tiger) {
    req.tiger = tiger;
    next();
  } else {
    res.status(404).json({ error: 'Not found' });
  }
});

tigersRouter
  .route('/')
  .get((req, res) => {
    res.json(tigers);
  })
  .post(updateId, (req, res) => {
    const tiger = req.body;
    res.json(tiger);
  });

tigersRouter
  .route('/:id')
  .get((req, res) => {
    const tiger = _.find(tigers, { id: req.params.id });
    res.json(tiger || {});
  })
  .put((req, res) => {
    const update = req.body;
    if (update.id) {
      delete update.id;
    }

    const tiger = _.findIndex(tigers, { id: req.params.id });
    if (!tigers[tiger]) {
      res.send();
    } else {
      const updatedLion = _.assign(tigers[tiger], update);
      res.json(updatedLion);
    }
  })
  .delete((req, res) => {
    const tiger = _.findIndex(tigers, { id: req.params.id });
    tigers.splice(tiger, 1);

    res.json(req.tiger);
  });

module.exports = tigersRouter;
