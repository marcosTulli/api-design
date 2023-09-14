const { MongoClient, ObjectId, Db } = require('mongodb');
const logger = require('../../util/logger');
const { users } = require('../collections');
const User = require('./userModel');
require('dotenv').config();
const _ = require('lodash');

const MONGO_URL = process.env.MONGO_URL;
const DB_NAME = process.env.DB_NAME;

exports.params = async function (req, res, next, id) {
  const client = new MongoClient(MONGO_URL);
  const db = client.db(DB_NAME);
  const item = await db.collection(users).findOne(id);
  try {
    if (item) {
      req.user = item;
    }
  } catch (err) {
    next(err);
  }
};

exports.get = async function (req, res, next) {
  const client = new MongoClient(MONGO_URL);
  try {
    client.connect();
    const db = client.db(DB_NAME);
    const items = db.collection('users');
    res.send('TUKI');
  } catch (err) {
    next(err);
  }
};

exports.getOne = function (req, res, next) {
  var user = req.user;
  res.json(user);
};

exports.put = function (req, res, next) {
  var user = req.user;

  var update = req.body;

  _.merge(user, update);

  user.save(function (err, saved) {
    if (err) {
      next(err);
    } else {
      res.json(saved);
    }
  });
};

exports.post = function (req, res, next) {
  var newUser = req.body;

  User.create(newUser).then(
    function (user) {
      res.json(user);
    },
    function (err) {
      next(err);
    }
  );
};

exports.delete = function (req, res, next) {
  req.user.remove(function (err, removed) {
    if (err) {
      next(err);
    } else {
      res.json(removed);
    }
  });
};
