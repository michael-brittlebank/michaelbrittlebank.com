const //packages
    requestPromise = require('request-promise'),
    moment = require('moment'),
//models
    contentModel = require('../models/content'),
//services
    responseService = require('../services/response'),
    utilService = require('../services/util'),
    sessionService = require('../services/session');

var contentMiddleware = {};

contentMiddleware.getHeaderMenu = function(req,res,next){
    const menuSession = sessionService.getHeaderMenu(req);
    if(moment().isBefore(utilService.getValueFromKey(menuSession, 'expiry'))){
        res.locals.menuItems = utilService.getValueFromKey(menuSession, 'menuItems');
        next();
    } else {
        const options = {
            method: 'GET',
            uri: process.env.API_URL+'?json=menu.get_menu&menu_location=header-menu'
        };
        requestPromise(options)
            .then(function (response) {
                return contentModel.getMenuObject(response);
            })
            .then(function(data) {
                sessionService.setHeaderMenu(req,{
                    expiry: moment().add(7, 'days'),
                    menuItems: data
                });
                res.locals.menuItems = data;
                next();
            })
            .catch(function (error) {
                responseService.defaultCatch(error, next,'portfolio');
            });
    }
};

module.exports = contentMiddleware;