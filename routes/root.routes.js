var /* packages */
    express = require('express'),
    router = express.Router(),
/* services */
    webapp = require('../services/webapp.service'),
    rootCtrl = require('../controllers/root.controller');

router.get('/sitemap.xml',rootCtrl.getSitemap);

module.exports = router;
