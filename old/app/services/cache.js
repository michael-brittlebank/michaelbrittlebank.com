const //packages
    _ = require('lodash'),
    requestPromise = require('request-promise'),
    moment = require('moment'),
    promise = require('bluebird'),
    redis = require('redis'),
//models
    contentModel = require('../models/content'),
//services
    logService = require('./logs');

//redis configuration
promise.promisifyAll(redis.RedisClient.prototype);
promise.promisifyAll(redis.Multi.prototype);
const redisClient = redis.createClient();

function primeRedisCache(){
    _.forOwn(cache, function(entry){
        entry();
    });
}

redisClient.on('connect', function() {
    logService.info('Connected to Redis');
    //check env cache key
    const cacheKey = 'NODE_CACHE_KEY',
        envValue = process.env.NODE_CACHE_KEY;
    return redisClient.getAsync(cacheKey)
        .then(function(response) {
            if(!response) {
                redisClient.set(cacheKey,envValue);
                logService.info('Redis ENV key set');
                //prime cache on startup
                primeRedisCache();
                return promise.resolve();
            } else if (response !== envValue){
                return redisClient.flushdbAsync()
                    .then(function () {
                        logService.info('ENV key change detected. Flushed Redis database');
                        redisClient.set(cacheKey, envValue);
                        //prime cache after flushing
                        primeRedisCache();
                        return promise.resolve();
                    })
                    .catch(function(error){
                        return promise.reject(error);
                    });
            }
        });
}).on('error', function (error) {
    //default error handler
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
            const urlKey = process.env.API_URL+'?json=custom_posts.get_posts&post_type=homepage-block&count=-1',
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
            const urlKey = process.env.API_URL+'?json=custom_posts.get_posts&post_type=portfolio-item&count=-1',
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
            const urlKey = process.env.API_URL+'?json=custom_posts.get_posts&post_type=music-post&count=-1',
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

cache.getCachedTravelImages = function(){
    return promise.resolve()
        .then(function(){
            const urlKey = process.env.API_URL+'?json=custom_posts.get_posts&post_type=travel-image&count=-1',
                options = {
                    method: 'GET',
                    uri: urlKey
                };
            return redisClient.getAsync(urlKey)
                .then(function(response) {
                    if(!response){
                        return requestPromise(options)
                            .then(function (response) {
                                return contentModel.getTravelImageObjects(response);
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

cache.getCachedPages = function(){
    return promise.resolve()
        .then(function(){
            const urlKey = process.env.API_URL+'?json=custom_posts.get_posts&post_type=page&count=-1',
                options = {
                    method: 'GET',
                    uri: urlKey
                };
            return redisClient.getAsync(urlKey)
                .then(function(response) {
                    if(!response){
                        return requestPromise(options)
                            .then(function (response) {
                                return contentModel.getPageObjects(response);
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

cache.getCachedQuotes = function(){
    return promise.resolve()
        .then(function(){
            const urlKey = process.env.API_URL+'?json=custom_posts.get_posts&post_type=quote&count=-1',
                options = {
                    method: 'GET',
                    uri: urlKey
                };
            return redisClient.getAsync(urlKey)
                .then(function(response) {
                    if(!response){
                        return requestPromise(options)
                            .then(function (response) {
                                return contentModel.getQuoteObjects(response);
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

module.exports = cache;