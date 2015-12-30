var /* packages */
    express = require('express'),
    router = express.Router(),
/* services */
    webapp = require('../services/webapp.service'),
    localCtrl = require('../controllers/local.controller');

/* GET home page. */
router.route('/')
    .get(localCtrl.getLocalIndex);

router.route('/500')
    .get(localCtrl.getLocal500Page);

router.route('/404')
    .get(localCtrl.getLocal404Page);

router.route('/*')
    .get(localCtrl.getLocalDefaultPage);

module.exports = router;

