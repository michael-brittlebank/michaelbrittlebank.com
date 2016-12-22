const /* packages */
    express = require('express'),
    router = express.Router(),
/* controllers */
    postsController = require('../controllers/posts');

router.route('/*')
    .get(postsController.getDefaultPostPage);

module.exports = router;
