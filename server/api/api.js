const router = require('express').Router();
const users = require('../api/user/userRoutes');
const categories = require('../api/category/categoryRoutes');
const posts = require('../api/post/postRoutes');

// api router will mount other routers
// for all our resources. Each resource directory
// has a resourceRoutes.js file with the router ready to go,
// require them and mount them to their respective routes below

router.use('/users', users);
router.use('/categories', categories);
router.use('/posts', posts);

module.exports = router;
