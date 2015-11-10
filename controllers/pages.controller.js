var /* packages */
    promise = require('bluebird'),
/* services */
    webapp = require('../services/webapp.service'),
    contentfulService = require('../services/contentful.service'),
    errorService = require('../services/error.service'),
    logger = require('../lib/logger'),
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
        .then(function (results) {
            var entries = results[0];
            logger.log('info','these are entries',JSON.stringify(entries));
            res.locals.page = {
                title: 'homepage',
                body: 'homepage body'
            };
            return res.render('index');
        })
        .catch(function(err){
            return next(err);
        });
};

module.exports = pages;