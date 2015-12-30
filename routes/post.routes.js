var /* packages */
    express = require('express'),
    router = express.Router(),
/* services */
    webapp = require('../services/webapp.service'),
    postCtrl = require('../controllers/post.controller');

router.route('/*')
    .get(postCtrl.getDefaultPostPage);

module.exports = router;
