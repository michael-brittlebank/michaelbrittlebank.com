const // packages
    express = require('express'),
    router = express.Router(),
    // services
    portfolioController = require('../controllers/portfolio');

router.route('/:pageTitle')
    .get(portfolioController.getPortfolioItem);

router.route('/')
    .get(portfolioController.getPortfolioPage);

module.exports = router;
