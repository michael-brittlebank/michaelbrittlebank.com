var /* packages */
    express = require('express'),
    router = express.Router(),
    /* services */
    webapp = require('../services/webapp.service'),
    pagesCtrl = require('../controllers/pages.controller');

/* GET home page. */
router.get('/',pagesCtrl.getIndex);

module.exports = router;
