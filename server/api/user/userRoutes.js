const router = require('express').Router();
const logger = require('../../util/logger');
const controller = require('./userController');
const createRoutes = require('../../util/createRoutes');
// createRoutes(controller, router);

// router.param('id', controller.params);
// router.route('/').get(controller.get).post(controller.post);
// router.route('/:id').get(controller.getOne).put(controller.put).delete(controller.delete);
// module.exports = router;

// const router = require('express').Router();
const testController = require('./testController');

router.param('id', testController.params());

router
  .route('/')
  .get(async (req, res) => {
    try {
      const data = await testController.get();
      res.json(data);
    } catch (error) {
      // Handle errors
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  })
  .post(async (req, res) => {
    try {
      const newItem = req.body;
      const result = await testController.add(newItem);
      res.status(201).json(result);
    } catch (error) {
      // Handle errors
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });

router
  .route('/:id')
  .get(async (req, res) => {
    testController.getById(req, res);
  })
  .put(async (req, res) => {
    try {
      const id = req.params.id;
      const updatedItem = req.body;
      const result = await testController.update(id, updatedItem);
      if (!result) {
        res.status(404).json({ error: 'Not Found' });
      } else {
        res.json(result);
      }
    } catch (error) {
      // Handle errors
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  })
  .delete(async (req, res) => {
    try {
      const id = req.params.id;
      const success = await testController.remove(id);
      if (!success) {
        res.status(404).json({ error: 'Not Found' });
      } else {
        res.status(204).send();
      }
    } catch (error) {
      // Handle errors
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });

module.exports = router;
