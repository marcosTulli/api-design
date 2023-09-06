const _ = require('lodash');
const tigersRouter = require('express').Router();

const tigers = [
  {
    'name': 'TIGER',
    'pride': 'The tiger',
    'age': '1',
    'gender': 'male',
    'id': 4,
  },
];
let id = 0;

const updateId = function (req, res, next) {
  if (!req.body.id) {
    id++;
    req.body['id'] = id.toString();
  }
  next();
};

tigersRouter.param('id', function (req, res, next, id) {
  const tiger = _.find(tigers, { id: id });
  if (tiger) {
    req.tiger = tiger;
    next();
  } else {
    res.send();
  }
});

tigersRouter.get('/tigers', (req, res) => {
  res.json(tigers);
});

tigersRouter.get('/tigers/:id', (req, res) => {
  const tiger = _.find(tigers, { id: req.params.id });
  res.json(tiger || {});
});

tigersRouter.post('/tigers', updateId, (req, res) => {
  const tiger = req.body;
  tigers.push(tiger);
  res.json(tiger);
});

tigersRouter.put('/tigers/:id', (req, res) => {
  var update = req.body;
  if (update.id) {
    delete update.id;
  }
  const tiger = _.findIndex(tigers, { id: req.params.id });
  if (!tigers[tiger]) {
    res.send();
  } else {
    const updatedTiger = _.assign(tigers[tiger], update);
    res.json(updatedTiger);
  }
});

tigersRouter.post('/tigers', (req, res) => {
  let tiger = req.body;
  tigers.push(tiger);
  res.json(tiger);
});

tigersRouter.delete('/tigers/:id', (req, res) => {
  const tiger = _.findIndex(tigers, { id: req.params.id });
  if (!tigers[tiger]) {
    res.send();
  } else {
    let deletedLion = tigers[tiger];
    tigers.splice(tiger, 1);
    res.json(deletedLion);
  }
});

module.exports = tigersRouter;
