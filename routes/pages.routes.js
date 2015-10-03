var express = require('express'),
    router = express.Router(),
    zero = require('../services/zero'),
    pagesCtrl = require('../controllers/pages.controller');

/* GET home page. */
router.get('/',pagesCtrl.getIndex);

if (!zero.app.isLiveConfig()) {
    /* GET 404 page. */
    router.get('/404', pagesCtrl.default404Page);

    /* GET 500 page. */
    router.get('/500', pagesCtrl.default500Page);
}

/* GET page. */
router.get('/*', pagesCtrl.default404Page);

module.exports = router;
