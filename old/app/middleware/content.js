const //packages
    _ = require('lodash'),
//services
    responseService = require('../services/response'),
    cacheService = require('../services/cache');

var contentMiddleware = {};

contentMiddleware.getHeaderMenu = function(req,res,next){
    cacheService.getCachedHeaderMenu()
        .then(function(data){
            var childIsActive;
            _.filter(data, function(entry){
                childIsActive = false;
                if (!_.isEmpty(entry.children)){
                    _.filter(entry.children, function(child){
                        if(child.url === req.originalUrl){
                            child.class = 'active';
                            if(parseInt(child.parentId) !== 0){
                                childIsActive = true;
                            }
                        }
                    });
                }
                if(entry.url === req.originalUrl || childIsActive){
                    //for submenu options which do not share a base url with the parent
                    entry.class = 'active';
                }
                if(req.originalUrl.indexOf(entry.url) !== -1 && entry.url !== '/'){
                    //for music posts which have a base url which matches the header element
                    entry.class = 'active';
                }
            });
            res.locals.menuItems = data;
            next();
        })
        .catch(function(error){
            responseService.defaultCatch(error, next, 'header menu')
        });
};

module.exports = contentMiddleware;