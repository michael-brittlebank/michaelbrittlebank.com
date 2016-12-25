const //packages
    requestPromise = require('request-promise'),
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
            console.log('menu',response);
            // return contentModel.getPortfolioItemObjects(response);
        })
        .then(function(data) {
            next();
        })
        .catch(function (error) {
            responseService.defaultCatch(error, next,'portfolio');
        });
};

module.exports = contentMiddleware;