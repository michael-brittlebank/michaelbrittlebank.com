const // packages
    promise = require('bluebird');

var api = {};

api.getDefaultPostPage = function(req, res, next) {
    // var params = {
    //     content_type: contentfulService.contentTypes.post,
    //     'fields.url[in]': req.originalUrl.replace('/music', '').replace(/^\/|\/$/g, ''),
    //     limit: 1
    // };
    // return promise
    //     .all([contentfulService.getEntries(params)])
    //     .then(function (response) {
    //         res.locals.page = contentService.postDigest(response[0]);
    //         //todo, add links for next post and previous post
            res.render('music/default');
        // })
        // .catch(function (err) {
        //     next(err);
        // });
};

module.exports = api;