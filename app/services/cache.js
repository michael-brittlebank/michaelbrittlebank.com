const //packages
    requestPromise = require('request-promise'),
    moment = require('moment'),
    promise = require('bluebird'),
    redis = require('redis'),
//models
    contentModel = require('../models/content'),
//services
    utilService = require('./util'),
    logService = require('./logs');

//redis configuration
promise.promisifyAll(redis.RedisClient.prototype);
promise.promisifyAll(redis.Multi.prototype);
const redisClient = redis.createClient();

redisClient.on('connect', function() {
    logService.info('Connected to Redis');
}).on('error', function (error) {
    logService.error(error);
});

var cache = {};

/*
 * middleware
 */
cache.getCachedHeaderMenu = function(){
    return promise.resolve()
        .then(function(){
            const urlKey = process.env.API_URL+'?json=menu.get_menu&menu_location=header-menu',
                options = {
                    method: 'GET',
                    uri: urlKey
                };
            return redisClient.getAsync(urlKey)
                .then(function(response) {
                    if(!response){
                        return requestPromise(options)
                            .then(function (response) {
                                return contentModel.getMenuObject(response);
                            })
                            .then(function (data) {
                                redisClient.set(urlKey,JSON.stringify(data));
                                redisClient.expire(urlKey, moment.duration(1, 'year').asSeconds());
                                return promise.resolve(data);
                            });
                    } else {
                        return promise.resolve(JSON.parse(response));
                    }
                })
                .catch(function(error){
                    return promise.reject(error);
                });
        });
};


/*
 * pages
 */
cache.getCachedHomepageBlocks = function(){
    return promise.resolve()
        .then(function(){
            const urlKey = process.env.API_URL+'?json=get_posts&post_type=homepage-block&count=-1',
                options = {
                    method: 'GET',
                    uri: urlKey
                };
            return redisClient.getAsync(urlKey)
                .then(function(response) {
                    if(!response){
                        return requestPromise(options)
                            .then(function (response) {
                                return contentModel.getHomepageBlockObjects(response);
                            })
                            .then(function (data) {
                                redisClient.set(urlKey,JSON.stringify(data));
                                redisClient.expire(urlKey, moment.duration(1, 'year').asSeconds());
                                return promise.resolve(data);
                            });
                    } else {
                        return promise.resolve(JSON.parse(response));
                    }
                })
                .catch(function(error){
                    return promise.reject(error);
                });
        });
};

cache.getCachedPortfolioItems = function(){
    return promise.resolve()
        .then(function(){
            const urlKey = process.env.API_URL+'?json=get_posts&post_type=portfolio-item&count=-1',
                options = {
                    method: 'GET',
                    uri: urlKey
                };
            return redisClient.getAsync(urlKey)
                .then(function(response) {
                    if(!response){
                        return requestPromise(options)
                            .then(function (response) {
                                return contentModel.getPortfolioItemObjects(response);
                            })
                            .then(function (data) {
                                redisClient.set(urlKey,JSON.stringify(data));
                                redisClient.expire(urlKey, moment.duration(1, 'year').asSeconds());
                                return promise.resolve(data);
                            });
                    } else {
                        return promise.resolve(JSON.parse(response));
                    }
                })
                .catch(function(error){
                    return promise.reject(error);
                });
        });
};

cache.getCachedMusicPosts = function(){
    return promise.resolve()
        .then(function(){
            const urlKey = process.env.API_URL+'?json=get_posts&post_type=music-post&count=-1',
                options = {
                    method: 'GET',
                    uri: urlKey
                };
            return redisClient.getAsync(urlKey)
                .then(function(response) {
                    if(!response){
                        return requestPromise(options)
                            .then(function (response) {
                                return contentModel.getMusicPostObjects(response);
                            })
                            .then(function (data) {
                                redisClient.set(urlKey,JSON.stringify(data));
                                redisClient.expire(urlKey, moment.duration(1, 'day').asSeconds());
                                return promise.resolve(data);
                            });
                    } else {
                        return promise.resolve(JSON.parse(response));
                    }
                })
                .catch(function(error){
                    return promise.reject(error);
                });
        });
};

module.exports = cache;