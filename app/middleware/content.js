const //packages
    requestPromise = require('request-promise'),
//models
    contentModel = require('../models/content'),
//services
    responseService = require('../services/response');

var contentMiddleware = {};

contentMiddleware.getHeaderMenu = function(req,res,next){
    //todo, cache result
    const options = {
        method: 'GET',
        uri: process.env.API_URL+'?json=menu.get_menu&menu_location=header-menu'
    };
    requestPromise(options)
        .then(function (response) {
            return contentModel.getMenuObject(response);
        })
        .then(function(data) {
            res.locals.menuItems = data;
            next();
        })
        .catch(function (error) {
            responseService.defaultCatch(error, next,'portfolio');
        });
};

module.exports = contentMiddleware;