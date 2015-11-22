var /* packages */
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
            return res.render('index');
        })
        .catch(function (err) {
            return next(err);
        });
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
                    case 'Bubbles':
                        res.render('page-bubbles');
                        break;
                    case 'Scales':
                        res.render('page-scales');
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
            return res.render('500');
        })
        .catch(function (err) {
            return next(err);
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
            return res.render('404');
        })
        .catch(function (err) {
            return next(err);
        });
};

module.exports = pages;