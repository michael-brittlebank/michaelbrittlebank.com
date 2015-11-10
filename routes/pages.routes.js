var /* packages */
    express = require('express'),
    router = express.Router(),
    /* services */
    webapp = require('../services/webapp.service'),
    pagesCtrl = require('../controllers/pages.controller');

/* GET home page. */
router.get('/',pagesCtrl.getIndex);

if(!webapp.app.isLiveConfig()){
    router.get('/500',pagesCtrl.get500Page);
    router.get('/404',pagesCtrl.get404Page);
}

module.exports = router;
