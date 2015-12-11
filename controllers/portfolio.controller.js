var /* packages */
    promise = require('bluebird'),
/* services */
    contentfulService = require('../services/contentful.service'),
    contentService = require('../services/content.service'),
    webapp = require('../services/webapp.service'),
    logger = require('../services/logger.service'),
    portfolio = {};

/**
 * Main Routes
 */
portfolio.getDefaultPortfolioPage = function(req, res, next) {
    var params = {
        content_type: contentfulService.contentTypes.portfolio,
        'fields.url[in]': req.originalUrl.replace(/^\/|\/$/g, ''),
        limit: 1
    };
    return promise
        .all([contentfulService.getEntries(params)])
        .then(function (response) {
            var page = contentService.portfolioDigest(response[0]);
            res.locals.page = page;
            if (webapp.simpleNullCheck(page, 'layout')) {
                switch (page.layout) {
                    case 'Bubbles':
                        res.render('portfolio-bubbles');
                        break;
                    case 'Scales':
                        //todo, add portfolio cpt and routes
                        res.render('portfolio-scales');
                        break;
                    default:
                        res.render('page');
                }
            } else {
                res.render('page');
            }
        })
        .catch(function (err) {
            return next(err);
        });
};

module.exports = portfolio;