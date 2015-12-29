var /* packages */
    contentful = require('contentful'),
/* config */
    config = require('../config/config'),
/* services */
    errorService = require('./error.service'),
    logger = require('./logger.service'),
    webapp = require('./webapp.service'),
    contentfulService = {};

contentfulService.contentTypes = {
    page: config.contentful.contentTypes.page,
    portfolio: config.contentful.contentTypes.portfolio,
    contentBlock: config.contentful.contentTypes.contentBlock,
    quote: config.contentful.contentTypes.quote,
    menu: config.contentful.contentTypes.menu,
    album: config.contentful.contentTypes.album,
    post: config.contentful.contentTypes.post
};

var client = contentful.createClient({
    space: config.contentful.spaceId,
    accessToken: config.contentful.accessToken,
    secure: true,
    host: 'cdn.contentful.com'
});

contentfulService.getContentTypes = function(){
   return client.contentTypes()
        .then(function(contentTypes){
            if(contentTypes){
                contentTypes.forEach(function(entry){
                    logger.log('info','content type: '+entry.name+' id: '+entry.sys.id);
                });
            }
        })
        .catch(function(err){
            throw new errorService.InternalServerError('Contentful client error: '+JSON.stringify(err));
        });
};

/**
 * Gets all contentful entries based on query parameters
 *
 * @method getAllEntries
 * @return {Object} Returns contentful entries or error object
 */
contentfulService.getEntries = function(params){
    params.include = 10;
    return client.entries(params)
        .then(function(entries) {
            if (entries.length > 0){
                return entries;
            } else {
                throw new errorService.NotFoundError();
            }
        })
        .catch(function(err){
            if (err.status === webapp.status.notFound){
                throw new errorService.NotFoundError('Entries not found with params: '+JSON.stringify(params));
            } else {
                throw new errorService.InternalServerError('Contentful get entries error: '+JSON.stringify(err));
            }
        });
};

module.exports = contentfulService;
