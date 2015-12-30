var /* services */
    webapp = require('../services/webapp.service'),
    logger = require('../services/logger.service'),
    pages = {};

/**
 * main routes
 */
pages.getLocalIndex = function(req, res, next) {
    res.locals.page = {
        body: 'hell worold'
    };
    res.render('page-homepage');
};

pages.getLocalDefaultPage = function(req, res, next) {
    if (req.originalUrl.indexOf('bubbles') !== 1) {
        res.render('page-bubbles');
    }
    else if (req.originalUrl.indexOf('scale') !== 1){
        res.render('page-scales');
    }
    else {
        res.render('single-page');
    }
};

pages.getLocal500Page = function(req, res, next) {
    res.render('page-500');
};

pages.getLocal404Page = function(req, res, next) {
    res.render('page-404');
};

module.exports = pages;