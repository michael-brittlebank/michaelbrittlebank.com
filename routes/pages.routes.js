var /* packages */
    express = require('express'),
    router = express.Router(),
    /* services */
    webapp = require('../services/webapp.service'),
    pagesCtrl = require('../controllers/pages.controller');

/* GET home page. */
router.route('/')
    .get(pagesCtrl.getIndex);

if(!webapp.app.isLiveConfig()){
    router.route('/500')
        .get(pagesCtrl.get500Page);

    router.route('/404')
        .get(pagesCtrl.get404Page);
}

router.route('/*')
    .get(pagesCtrl.getDefaultPage);

module.exports = router;
