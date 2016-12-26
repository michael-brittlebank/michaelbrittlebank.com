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

module.exports = content;