var /* packages */
    express = require('express'),
    router = express.Router(),
/* services */
    webapp = require('../services/webapp.service'),
    localCtrl = require('../controllers/local.controller');

/* GET home page. */
router.get('/',localCtrl.getLocalIndex);

router.get('/500',localCtrl.getLocal500Page);
router.get('/404',localCtrl.getLocal404Page);

router.get('/*',localCtrl.getLocalDefaultPage);

module.exports = router;

