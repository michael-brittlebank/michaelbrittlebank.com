const // packages
    express = require('express'),
    router = express.Router(),
// services
    utilService = require('../services/util'),
//middleware
    contentMiddleware = require('../middleware/content'),
//controllers
    pagesController = require('../controllers/pages');

/* GET home page. */
router.route('/')
    .get(contentMiddleware.getHeaderMenu,pagesController.getIndex);

router.route('/travel')
    .get(contentMiddleware.getHeaderMenu,pagesController.getTravelPage);

router.route('/music')
    .get(contentMiddleware.getHeaderMenu,pagesController.getMusicPage);

router.route('/portfolio')
    .get(contentMiddleware.getHeaderMenu,pagesController.getPortfolioPage);

router.route('/resume')
    .get(contentMiddleware.getHeaderMenu,pagesController.getResumePage);

if(utilService.isLocalConfig()){
    router.route('/500')
        .get(contentMiddleware.getHeaderMenu,pagesController.get500Page);

    router.route('/404')
        .get(contentMiddleware.getHeaderMenu,pagesController.get404Page);
}

module.exports = router;
