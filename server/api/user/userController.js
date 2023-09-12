const { MongoClient, ObjectId, Db } = require('mongodb');
const { MONGO_URL, DB_NAME } = require('../variables');
const { users } = require('../collections');
var User = require('./userModel');
var _ = require('lodash');

exports.params = async function (req, res, next, id) {
  // return new Promise(async (res, rej) => {
  const client = new MongoClient(MONGO_URL);
  try {
    await client.connect();
    const db = client.db(DB_NAME);
    const user = await db.collection(users).findOne(new ObjectId(id));
    client.close();
  } catch (error) {
    rej(error);
  }
  // });

  User.findById(id).then(
    function (user) {
      if (!user) {
        next(new Error('No user with that id'));
      } else {
        req.user = user;
        next();
      }
    },
    function (err) {
      next(err);
    }
  );
};

exports.get = function (req, res, next) {
  User.find({}).then(
    function (users) {
      res.json(users);
    },
    function (err) {
      next(err);
    }
  );
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
