var /* packages */
    express = require('express'),
    router = express.Router(),
/* services */
    rootCtrl = require('../controllers/root.controller');

router.route('/sitemap.xml')
    .get(rootCtrl.getSitemap);

router.route('/robots.txt')
    .get(rootCtrl.getRobotsTxt);

module.exports = router;
