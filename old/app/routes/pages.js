const // packages
    express = require('express'),
    router = express.Router(),
// services
    utilService = require('../services/util'),
//controllers
    pagesController = require('../controllers/pages');

/* GET home page. */
router.route('/')
    .get(pagesController.getIndex);

router.route('/travel')
    .get(pagesController.getTravelPage);

router.route('/resume')
    .get(pagesController.getResumePage);

router.route('/chorus')
    .get(pagesController.getChorusPage);

if(utilService.isLocalConfig()){
    router.route('/500')
        .get(pagesController.get500Page);

    router.route('/404')
        .get(pagesController.get404Page);
}

module.exports = router;
