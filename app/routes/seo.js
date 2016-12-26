const //packages
    express = require('express'),
    router = express.Router(),
//services
    seoController = require('../controllers/seo');

router.route('/sitemap.xml')
    .get(seoController.getSitemap);

router.route('/robots.txt')
    .get(seoController.getRobotsTxt);

module.exports = router;
