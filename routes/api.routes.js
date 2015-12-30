var /* packages */
    express = require('express'),
    router = express.Router(),
/* services */
    webapp = require('../services/webapp.service'),
    apiCtrl = require('../controllers/api.controller');

router.route('/loadMorePosts')
    .post(apiCtrl.loadMorePosts);

module.exports = router;
