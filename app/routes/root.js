const //packages
    express = require('express'),
    router = express.Router(),
//services
    rootController = require('../controllers/root');
//
// router.route('/sitemap.xml')
//     .get(rootController.getSitemap);
//
// router.route('/robots.txt')
//     .get(rootController.getRobotsTxt);

module.exports = router;
