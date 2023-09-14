require('dotenv').config();
const { MongoClient, ObjectId, Db } = require('mongodb');
const _ = require('lodash');

const MONGO_URL = process.env.MONGO_URL;
const DB_NAME = process.env.DB_NAME;

function testContoller() {
  function params() {
    return async (req, res, next, id) => {
      const client = new MongoClient(MONGO_URL);
      try {
        await client.connect();
        const db = client.db(DB_NAME);
        const item = await db.collection('users').findOne({ id: id });
        if (item) {
          req.user = item;
          next(); // Call next to continue with the route handling
        } else {
          res.status(404).json({ error: 'User Not Found' });
        }
        client.close();
      } catch (err) {
        next(err); // Call next with an error to handle it further up the middleware chain
      }
    };
  }

  function loadData(data) {
    return new Promise(async (res, rej) => {
      const client = new MongoClient(MONGO_URL);
      try {
        await client.connect();
        const db = client.db(DB_NAME);
        const results = await db.collection('users').insertMany(data);
        res(results);
        client.close();
      } catch (error) {
        rej(error);
      }
    });
  }

  function get(query, limit) {
    return new Promise(async (res, rej) => {
      const client = new MongoClient(MONGO_URL);
      try {
        await client.connect();
        const db = client.db(DB_NAME);
        let items = db.collection('users').find(query);
        if (limit > 0) {
          items = items.limit(limit);
        }
        res(await items.toArray());
        client.close();
      } catch (error) {
        rej(error);
      }
    });
  }

  function getById(req, res) {
    res.json(req.user);
  }

  function add(item) {
    return new Promise(async (res, rej) => {
      const client = new MongoClient(MONGO_URL);
      try {
        await client.connect();
        const db = client.db(DB_NAME);
        const addedItem = await db.collection('users').insertOne(item);
        res(addedItem);
        client.close();
      } catch (error) {
        rej(error);
      }
    });
  }

  function update(id, newItem) {
    return new Promise(async (res, rej) => {
      const client = new MongoClient(MONGO_URL);
      try {
        await client.connect();
        const db = client.db(DB_NAME);
        const updatedItem = await db
          .collection('users')
          .findOneAndReplace({ id: id }, newItem, { returnDocument: 'after' });
        res(updatedItem.value);
        client.close();
      } catch (error) {
        rej(error);
      }
    });
  }

  function remove(id) {
    return new Promise(async (res, rej) => {
      const client = new MongoClient(MONGO_URL);
      try {
        await client.connect();
        const db = client.db(DB_NAME);
        const removed = await db.collection('users').deleteOne(id);
        res(removed.deletedCount === 1);
        client.close();
      } catch (error) {
        rej(error);
      }
    });
  }

  function averageFinalists() {
    return new Promise(async (res, rej) => {
      const client = new MongoClient(MONGO_URL);
      try {
        await client.connect();
        const db = client.db(DB_NAME);
        const average = await db
          .collection('users')
          .aggregate([
            {
              $group: {
                _id: null,
                avgFinalists: { $avg: '$Pulitzer Prize Winners and Finalists, 1990-2014' },
              },
            },
          ])
          .toArray();

        res(average[0].avgFinalists);
        client.close();
      } catch (error) {
        rej(error);
      }
    });
  }

  function averageFinalistsByChange() {
    return new Promise(async (res, rej) => {
      const client = new MongoClient(MONGO_URL);
      try {
        await client.connect();
        const db = client.db(DB_NAME);
        const average = await db
          .collection('users')
          .aggregate([
            {
              $project: {
                'Newspaper': 1,
                'Pulitzer Prize Winners and Finalists, 2004-2014': 1,
                'Change in Daily Circulation, 2004-2013': 1,
                overallChange: {
                  $cond: {
                    if: { $gte: ['$Change in Daily Circulation, 2004-2013', 0] },
                    then: 'positive',
                    else: 'negative',
                  },
                },
              },
            },
            {
              $group: {
                _id: '$overallChange',
                avgFinalists: { $avg: '$Pulitzer Prize Winners and Finalists, 2004-2014' },
              },
            },
          ])
          .toArray();

        res(average);
        client.close();
      } catch (error) {
        rej(error);
      }
    });
  }

  return { loadData, get, getById, add, update, remove, averageFinalists, averageFinalistsByChange, params };
}

module.exports = testContoller();
