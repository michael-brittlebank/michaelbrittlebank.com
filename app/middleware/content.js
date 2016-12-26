const //services
    responseService = require('../services/response'),
    cacheService = require('../services/cache');

var contentMiddleware = {};

contentMiddleware.getHeaderMenu = function(req,res,next){
    cacheService.getCachedHeaderMenu()
        .then(function(data){
            res.locals.menuItems = data;
            next();
        })
        .catch(function(error){
            responseService.defaultCatch(error, next, 'header menu')
        });
};

module.exports = contentMiddleware;