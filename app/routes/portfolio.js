const /* packages */
    express = require('express'),
    router = express.Router(),
    /* services */
    portfolioController = require('../controllers/portfolio');

/* GET portfolio pages. */
router.route('/*')
    .get(portfolioController.getDefaultPortfolioPage);

module.exports = router;
