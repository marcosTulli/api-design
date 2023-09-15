module.exports = function (controller, router) {
  router.param('id', controller.params);
  router.route('/').get(controller.get).post(controller.post);
  router.route('/:id').get(controller.getById).put(controller.put).delete(controller.delete);
};
