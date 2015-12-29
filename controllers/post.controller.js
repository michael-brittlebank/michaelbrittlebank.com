var /* packages */
    _ = require('lodash'),
    promise = require('bluebird'),
/* services */
    contentfulService = require('../services/contentful.service'),
    contentService = require('../services/content.service'),
    webapp = require('../services/webapp.service'),
    logger = require('../services/logger.service'),
    api = {};

api.getDefaultPostPage = function(req, res, next) {
    var params = {
        content_type: contentfulService.contentTypes.post,
        'fields.url[in]': req.originalUrl.replace('/music', '').replace(/^\/|\/$/g, ''),
        limit: 1
    };
    return promise
        .all([contentfulService.getEntries(params)])
        .then(function (response) {
            res.locals.page = contentService.postDigest(response[0]);
            res.render('post');
        })
        .catch(function (err) {
            next(err);
        });
};

module.exports = api;