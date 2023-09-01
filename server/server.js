const express = require('express');
const _ = require('lodash');
const fs = require('fs');
const app = express();
const port = 3000;

const FILE_NAME = './lions.json';

app.use(express.static('client'));
app.use(express.json());

app.get('/lions', (req, res) => {
  try {
    fs.readFile(FILE_NAME, (err, buffer) => {
      if (err) {
        console.log('Unable to read', req.url);
        res.status(500).send({ message: `Unable to read ${req.url}` });
      } else {
        res.status(201).send(JSON.parse(buffer));
      }
    });
  } catch (err) {
    res.status(500).send({ message: `Unable to read ${req.url}` });
    console.log('Unable to read', req);
  }
});

app.get('/lions/:id', (req, res) => {
  try {
    fs.readFile(FILE_NAME, (err, buffer) => {
      if (err) {
        console.log('Unable to read', req.url);
        res.status(500).send({ message: `Unable to read ${req.url}` });
      } else {
        let object;
        const id = req.params.id;
        const parsedData = JSON.parse(buffer);
        parsedData.forEach((i) => {
          if (i.id === Number(id)) {
            object = i;
          }
        });
        res.status(201).send(object);
      }
    });
  } catch (err) {
    res.status(500).send({ message: `Unable to read ${req.url}` });
    console.log('Unable to read', req);
  }
});

app.post('/lions', (req, res) => {
  fs.readFile(FILE_NAME, (err, buffer) => {
    if (err) {
      rej(err);
    } else {
      const newEntry = req.body;
      const db = JSON.parse(buffer);
      const newId = db[db.length - 1].id + 1;
      newEntry['id'] = newId;
      db.push(newEntry);
      fs.writeFile(FILE_NAME, JSON.stringify(db), (err) => {
        if (err) {
          res.status(500).send(`Unable to POST ${req.body}`);
        } else {
          res.status(200).send(req.body);
        }
      });
    }
  });
});

app.listen(port, () => {
  console.log('Running on port: ', port);
});
