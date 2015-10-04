var /* packages */
    _ = require('lodash'),
    contentful = require('contentful'),
    promise = require('bluebird'),
/* config */
    config = require('../config/config'),
/* services */
    errorService = require('./error.service'),
    contentfulService = {};

contentfulService.contentTypes = {
    pages: 'page'
};

var client = contentful.createClient({
    space: config.contentful.spaceId,
    accessToken: config.contentful.accessToken,
    secure: true,
    host: 'cdn.contentful.com'
});

/**
 * Gets all contentful entries based on query parameters
 *
 * @method getAllEntries
 * @return {Object} Returns contentful entries or error object
 */
contentfulService.getEntries = function(params){
    if (params && params.hasOwnProperty('content_type')){
        return client.contentTypes()
            .then(function(contentTypes){
                var foundContentType = _.find(contentTypes, function (contentType) {
                    return contentType.name.toLowerCase() === params.content_type.toLowerCase();
                });
                if (foundContentType){
                    params.content_type = foundContentType.sys.id;
                    return client.entries(params)
                        .then(function(entries) {
                            return entries;
                        })
                        .catch(function(){
                            throw new errorService.NotFoundError('Entry not found with params: '+JSON.stringify(params));
                        });
                }
                else {
                    throw new errorService.NotFoundError('Content type not found: '+params.content_type);
                }
            })
            .catch(function(err){
                throw new errorService.NotFoundError('Content type not found: '+params.content_type);
            });
    }
    else {
        return new promise(function (resolve, reject) {
            client.entries(params, function (err, statusList, body) {
                if (err) {
                    reject(err);
                }
                else {
                    resolve(body);
                }
            });
        });
    }
};

module.exports = contentfulService;
