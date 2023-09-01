const express = require('express');
const _ = require('lodash');
const app = express();
const port = 3000;

// const FILE_NAME = './lions.json';
let lions = [];
let id = 0;

app.use(express.static('client'));
app.use(express.json());

app.get('/lions', (req, res) => {
  res.json(lions);
});

app.get('/lions/:id', (req, res) => {
  const lion = _.find(lions, { id: req.params.id });
  res.json(lion || {});
});

app.put('/lions/:id', (req, res) => {
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
});

app.post('/lions', (req, res) => {
  let lion = req.body;
  id++;
  lion['id'] = id + '';
  lions.push(lion);
  res.json(lion);
});

app.delete('/lions/:id', (req, res) => {
  const lion = _.findIndex(lions, { id: req.params.id });
  if (!lions[lion]) {
    res.send();
  } else {
    let deletedLion = lions[lion];
    lions.splice(lion, 1);
    res.json(deletedLion);
  }
});

app.listen(port, () => {
  console.log('Running on port: ', port);
});
