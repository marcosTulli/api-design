const _ = require('lodash');
const lionRouter = require('express').Router();

const lions = [
  {
    'name': 'SIMBA',
    'pride': 'LION KING',
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

lionRouter.param('id', function (req, res, next, id) {
  const lion = _.find(lions, { id: id });
  if (lion) {
    req.lion = lion;
    next();
  } else {
    res.send();
  }
});

lionRouter.get('/lions', (req, res) => {
  console.log('TUKI');
  res.json(lions);
});

lionRouter.get('/lions/:id', (req, res) => {
  const lion = _.find(lions, { id: req.params.id });
  res.json(lion || {});
});

lionRouter.post('/lions', updateId, (req, res) => {
  const lion = req.body;
  lions.push(lion);
  res.json(lion);
});

lionRouter.put('/lions/:id', (req, res) => {
  var update = req.body;
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
});

lionRouter.post('/lions', (req, res) => {
  let lion = req.body;
  lions.push(lion);
  res.json(lion);
});

lionRouter.delete('/lions/:id', (req, res) => {
  const lion = _.findIndex(lions, { id: req.params.id });
  if (!lions[lion]) {
    res.send();
  } else {
    let deletedLion = lions[lion];
    lions.splice(lion, 1);
    res.json(deletedLion);
  }
});

module.exports = lionRouter;
