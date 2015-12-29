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
    //.then(function (results) {
    //    return res.status(feast.status.ok).end(results.html);
    //})
    //    .catch(function (err) {
    res.status(webapp.status.ok).send('success');
    //});
    //var params = {
    //    content_type: contentfulService.contentTypes.post,
    //    'fields.postDate[lt]': new Date().toISOString(),
    //    order: '-fields.postDate',
    //    skip: 0,//todo
    //    limit: 10//todo
    //};
    //return promise
    //    .all([contentfulService.getEntries(params)])
    //    .then(function (response) {
    //        var content = response[0];
    //        res.locals.posts = _.values(contentService.postsDigest(content));
    //        res.render('page-music');
    //    })
    //    .catch(function (err) {
    //        next(err);
    //    });
};

module.exports = api;