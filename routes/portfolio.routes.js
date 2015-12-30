var /* packages */
    express = require('express'),
    router = express.Router(),
    /* services */
    portfolioCtrl = require('../controllers/portfolio.controller');

/* GET portfolio pages. */
router.route('/*')
    .get(portfolioCtrl.getDefaultPortfolioPage);

module.exports = router;
