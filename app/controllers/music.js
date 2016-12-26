const //packages
    _ = require('lodash'),
    promise = require('bluebird'),
//services
    utilService = require('../services/util'),
    responseService = require('../services/response'),
    cacheService = require('../services/cache'),
    contentService = require('../services/content');

var music = {};

music.getMusicPage = function(req, res, next) {
    promise.all([
        contentService.getCachedPageByUrl('/music'),
        cacheService.getCachedMusicPosts()
    ])
        .then(function(data) {
            res.render('pages/music',{
                page: data[0],
                posts: data[1]
            });
        })
        .catch(function (error) {
            responseService.defaultCatch(error, next,'music');
        });
};

music.getMusicPost = function(req, res, next) {
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

module.exports = music;