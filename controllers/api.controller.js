var /* packages */
    _ = require('lodash'),
    promise = require('bluebird'),
/* services */
    contentfulService = require('../services/contentful.service'),
    contentService = require('../services/content.service'),
    webapp = require('../services/webapp.service'),
    logger = require('../services/logger.service'),
    api = {};

api.loadMorePosts = function(req, res, next) {
    var numberOfPosts = 10,
        page = webapp.simpleNullCheck(req.body, 'page')?req.body.page:1,
        params = {
            content_type: contentfulService.contentTypes.post,
            'fields.postDate[lt]': new Date().toISOString(),
            order: '-fields.postDate',
            //skip: page*numberOfPosts,
            limit: numberOfPosts
        };
    return promise
        .all([contentfulService.getEntries(params)])
        .then(function (response) {
            var content = response[0],
                posts = _.values(contentService.postsDigest(content));
            res.status(webapp.status.ok).json(JSON.stringify(posts));
        })
        .catch(function (err) {
            logger.error('api - load more posts', JSON.stringify(err));
            res.status(webapp.status.noContent).end();
        });
};

module.exports = api;