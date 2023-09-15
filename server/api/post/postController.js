require('dotenv').config();
const { MongoClient } = require('mongodb');
const MONGO_URL = process.env.MONGO_URL;
const DB_NAME = process.env.DB_NAME;
const client = new MongoClient(MONGO_URL);

const connectToMongo = async () => {
  try {
    await client.connect();
    console.log('Connected to MongoDB');

    const db = client.db(DB_NAME);
    const collection = db.collection('posts');

    return collection;
  } catch (err) {
    console.error('Error connecting to MongoDB:', err);
    throw err;
  }
};

exports.params = async function (req, res, next, id) {
  const collection = await connectToMongo();
  try {
    const user = await collection.findOne({ id: id });
    if (!user) {
      next(new Error('No user with that id'));
    } else {
      req.user = user;
      client.close();
      next();
    }
  } catch (err) {
    next(err);
  }
};

exports.get = async function (req, res, next) {
  const collection = await connectToMongo();
  try {
    let items = collection.find();
    res.json(await items.toArray());
    client.close();
  } catch (error) {
    next(error);
  }
};

exports.post = async function (req, res, next) {
  const newUser = req.body;
  const collection = await connectToMongo();
  collection.insertOne(newUser).then(
    function (user) {
      res.json(user);
    },
    function (err) {
      next(err);
    }
  );
};

exports.getById = function (req, res, next) {
  const user = req.user;
  res.json(user);
};

exports.put = async function (req, res, next) {
  const collection = await connectToMongo();
  const user = req.user;
  if (user) {
    const update = req.body;
    const updatedItem = await collection.findOneAndReplace({ id: req.user.id }, update, {
      returnDocument: 'after',
    });
    res.json(updatedItem.value);
  } else {
    next(err);
  }
};

exports.delete = async function (req, res, next) {
  const collection = await connectToMongo();
  const removed = await collection.deleteOne({ id: req.user.id });
  res.send(removed.deletedCount === 1);
  next();
};
