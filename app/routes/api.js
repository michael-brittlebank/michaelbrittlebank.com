const /* packages */
    express = require('express'),
    router = express.Router(),
    apiController = require('../controllers/api');

router.route('/load-posts')
    .post(apiController.loadMorePosts);

module.exports = router;
