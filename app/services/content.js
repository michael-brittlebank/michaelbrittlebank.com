const //packages
    _ = require('lodash'),
    promise = require('bluebird'),
//services
    cacheService = require('./cache'),
    errorService = require('./errors');

var content = {};

content.getCachedPageByUrl = function(pageUrl){
    return cacheService.getCachedPages()
        .then(function(data){
            const pageObject = _.find(data,{'url': pageUrl});
            if(_.isEmpty(pageObject)){
                return promise.reject(new errorService.NotFoundError('page not found'));
            } else {
                return promise.resolve(pageObject);
            }
        })
        .catch(function(error){
            return promise.reject(error);
        });
};

content.getCachedMusicPostByUrl = function(postUrl){
    return cacheService.getCachedMusicPosts()
        .then(function(data){
            const postObject = _.find(data,{'url': postUrl});
            if(_.isEmpty(postObject)){
                return promise.reject(new errorService.NotFoundError('post not found'));
            } else {
                return promise.resolve(postObject);
            }
        })
        .catch(function(error){
            return promise.reject(error);
        });
};

module.exports = content;