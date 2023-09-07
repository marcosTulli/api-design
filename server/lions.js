const _ = require('lodash');
const lionsRouter = require('express').Router();
const utils = './utils';
const FILE_NAME = './lions.json';

let id = 0;
const updateId = (req, res, next) => {
  if (!req.body.id) {
    id++;
    req.body['id'] = id.toString();
  }
  next();
};

lionsRouter.param('id', (req, res, next, id) => {
  const lion = _.find(
    utils.get(
      FILE_NAME,
      (data) => {
        data;
      },
      (err) => {
        next(err);
      }
    ),
    { id: id }
  );
  if (lion) {
    res.json(lion);
    req.lion = lion;
    next();
  } else {
    res.send();
  }
});

lionsRouter
  .route('/')
  .get(
    FILE_NAME,
    (req, res) => {
      utils.get((data) => {
        res.json(data);
      });
    },
    (err) => {
      next(err);
    }
  )
  .post(updateId, (req, res) => {
    utils.insert(
      FILE_NAME,
      req.body,
      (data) => {
        res.status(201).json({ data });
      },
      (err) => {
        next(err);
      }
    );
  });

lionsRouter
  .route('/:id')
  .get((req, res) => {
    utils.getById(
      FILE_NAME,
      req.params.id,
      (data) => {
        if (data) {
          res.status(200).json({ data });
        } else {
          res.status(404).json({
            status: 400,
            statusText: 'Not found',
            message: `The pie ${req.params.id} could not be found`,
            error: {
              code: 'NOT_FOUND',
              message: `The pie ${req.params.id} could not be found`,
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
    pieRepo.getById(FILE_NAME, req.params.id, (data) => {
      if (data) {
        pieRepo.update(
          FILE_NAME,
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
    pieRepo.getById(FILE_NAME, req.params.id, (data) => {
      if (data) {
        pieRepo.delete(
          FILE_NAME,
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
  });

module.exports = lionsRouter;
