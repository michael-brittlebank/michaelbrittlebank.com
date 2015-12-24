var /* packages */
    _ = require('lodash'),
    promise = require('bluebird'),
/* services */
    contentfulService = require('../services/contentful.service'),
    contentService = require('../services/content.service'),
    webapp = require('../services/webapp.service'),
    logger = require('../services/logger.service'),
    pages = {};

/**
 * Main Routes
 */
pages.getIndex = function(req, res, next) {
    var params = {
        content_type: contentfulService.contentTypes.pages,
        'fields.url[in]': 'index',
        limit: 1
    };
    return promise
        .all([contentfulService.getEntries(params)])
        .then(function (response) {
            var content = response[0];
            res.locals.page = contentService.pageDigest(content);
            res.render('index', {
                layout: 'layout-index'
            });
        })
        .catch(function (err) {
            next(err);
        });
};

pages.getPortfolioPage = function(req, res, next){
    var params = {
        content_type: contentfulService.contentTypes.portfolio,
        limit: 999
    };
    return promise
        .all([contentfulService.getEntries(params)])
        .then(function (response) {
            var portfolioItems = [],
                processedItems = [];
            response[0].forEach(function(entry){
                portfolioItems.push(contentService.portfolioDigest(entry));
            });
            portfolioItems = _.groupBy(portfolioItems,function(entry){
                return entry.portfolioGroup;
            });
            for(var key in portfolioItems){
                processedItems.push({
                    name: key,
                    items: portfolioItems[key]
                });
            }
            res.locals.portfolio = _.sortBy(processedItems, 'name');
            var params = {
                content_type: contentfulService.contentTypes.quote,
                limit: 999
            };
            return promise
                .all([contentfulService.getEntries(params)])
                .then(function (response) {
                    var quoteItems = [];
                    response[0].forEach(function(entry){
                        quoteItems.push(contentService.quoteDigest(entry));
                    });
                    res.locals.quote = _.sample(quoteItems);
                    res.render('page-portfolio');
                })
                .catch(function (err) {
                    next(err);
                });
        })
        .catch(function (err) {
            next(err);
        });
};

pages.getResumePage = function(req, res, next) {
    res.render('page-resume');//todo
};

pages.getMusicPage = function(req, res, next) {
    res.render('page-music');//todo
};

pages.getScalesPage = function(req, res, next) {
    res.render('page-scales');//todo
};

pages.getTravelPage = function(req, res, next) {
    res.render('page-travel');//todo
};

pages.getDefaultPage = function(req, res, next) {
    var params = {
        content_type: contentfulService.contentTypes.pages,
        'fields.url[in]': req.originalUrl.replace(/^\/|\/$/g, ''),
        limit: 1
    };
    return promise
        .all([contentfulService.getEntries(params)])
        .then(function (response) {
            var page = contentService.pageDigest(response[0]);
            res.locals.page = page;
            if (webapp.simpleNullCheck(page, 'layout')) {
                switch (page.layout) {
                    case 'Portfolio':
                        pages.getPortfolioPage(res, res, next);
                        break;
                    case 'Resume':
                        pages.getResumePage(res, res, next);
                        break;
                    case 'Music':
                        pages.getMusicPage(res, res, next);
                        break;
                    case 'Travel':
                        pages.getTravelPage(res, res, next);
                        break;
                    case 'Scales':
                        pages.getScalesPage(res, res, next);
                        break;
                    default:
                        res.render('page');
                }
            } else {
                res.render('page');
            }
        })
        .catch(function (err) {
            next(err);
        });
};

pages.get500Page = function(req, res, next) {
    var params = {
        content_type: contentfulService.contentTypes.pages,
        'fields.url[in]': '500',
        limit: 1
    };
    return promise
        .all([contentfulService.getEntries(params)])
        .then(function (response) {
            var content = response[0];
            res.locals.page = contentService.pageDigest(content);
            res.render('500');//todo
        })
        .catch(function (err) {
            next(err);
        });
};

pages.get404Page = function(req, res, next) {
    var params = {
        content_type: contentfulService.contentTypes.pages,
        'fields.url[in]': '404',
        limit: 1
    };
    return promise
        .all([contentfulService.getEntries(params)])
        .then(function (response) {
            var content = response[0];
            res.locals.page = contentService.pageDigest(content);
            res.render('404');//todo
        })
        .catch(function (err) {
            next(err);
        });
};

module.exports = pages;