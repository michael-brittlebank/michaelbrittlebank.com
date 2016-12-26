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
        contentService.getCachedPageByUrl(req.originalUrl),
        cacheService.getCachedMusicPosts()
    ])
        .then(function(data) {
            res.render('music/page',{
                page: data[0],
                posts: data[1]
            });
        })
        .catch(function (error) {
            responseService.defaultCatch(error, next,'music');
        });
};

music.getMusicPost = function(req, res, next) {
    contentService.getCachedMusicPostByUrl(req.originalUrl)
        .then(function(data) {
            res.render('music/post',{
                page: data
            });
        })
        .catch(function (error) {
            responseService.defaultCatch(error, next,'music post');
        });
};

module.exports = music;