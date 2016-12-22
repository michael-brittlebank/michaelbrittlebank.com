var /* packages */
    _ = require('lodash'),
    promise = require('bluebird'),
/* services */
    utilService = require('../services/util'),
    logService = require('../services/logs'),
    api = {};

api.loadMorePosts = function(req, res, next) {
    res.status(utilService.status.ok).send('todo');
    // var numberOfPosts = 10,
    //     page = webapp.simpleNullCheck(req.body, 'page')&&parseInt(req.body.page)>0?req.body.page:1,
    //     params = {
    //         content_type: contentfulService.contentTypes.post,
    //         'fields.postDate[lt]': new Date().toISOString(),
    //         order: '-fields.postDate',
    //         skip: (page-1)*numberOfPosts,
    //         limit: numberOfPosts
    //     };
    // return promise
    //     .all([contentfulService.getEntries(params)])
    //     .then(function (response) {
    //         var content = response[0];
    //         res.locals.posts = _.values(contentService.postArrayDigest(content));
    //         res.locals.group = page;
    //         res.status(webapp.status.ok).render('partials/post-grid', {
    //             layout: false
    //         });
    //     })
    //     .catch(function (err) {
    //         logger.error('api - load more posts', JSON.stringify(err));
    //         res.status(webapp.status.noContent).end();
    //     });
};

module.exports = api;