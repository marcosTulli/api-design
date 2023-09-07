const express = require('express');
const _ = require('lodash');
const utils = require('../utils/utils');

module.exports = (fileName) => {
  const router = express.Router();

  router.param('id', async (req, res, next, id) => {
    try {
      const item = await new Promise((resolve, reject) => {
        utils.getById(fileName, id, resolve, reject);
      });

      if (item) {
        req.item = item;
        next();
      } else {
        res.status(404).json({
          status: 404,
          message: `The item with id ${id} could not be found`,
        });
      }
    } catch (err) {
      next(err);
    }
  });

  router
    .route('/')
    .get(
      (req, res) => {
        utils.get(fileName, (data) => {
          res.json(data);
        });
      },
      (err) => {
        next(err);
      }
    )
    .post((req, res) => {
      utils.insert(
        fileName,
        req.body,
        (data) => {
          res.status(201).json({ data });
        },
        (err) => {
          next(err);
        }
      );
    });

  router
    .route('/:id')
    .get((req, res) => {
      utils.getById(
        fileName,
        req.params.id,
        (data) => {
          if (data) {
            res.status(200).json({ data });
          } else {
            res.status(404).json({
              status: 400,
              statusText: 'Not found',
              message: `The item ${req.params.id} could not be found`,
              error: {
                code: 'NOT_FOUND',
                message: `The item ${req.params.id} could not be found`,
              },
            });
          }
        },
        (err) => {
          next(err);
        }
      );
    })
    .put((req, res) => {
      utils.getById(fileName, req.params.id, (data) => {
        if (data) {
          utils.update(
            fileName,
            req.body,
            req.params.id,
            (data) => {
              res.status(200).json({ data });
            },
            (err) => {
              next(err);
            }
          );
        }
      });
    })
    .delete((req, res) => {
      utils.getById(fileName, req.params.id, (data) => {
        if (data) {
          utils.delete(
            fileName,
            req.params.id,
            (data) => {
              res.status(200).json({ data });
            },
            (err) => {
              next(err);
            }
          );
        }
      });
    });

  return router;
};
