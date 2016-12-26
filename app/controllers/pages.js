const /* packages */
    _ = require('lodash'),
    promise = require('bluebird'),
    requestPromise = require('request-promise'),
//services
    utilService = require('../services/util'),
    responseService = require('../services/response'),
//models
    contentModel = require('../models/content');

var pages = {};

/**
 main pages
 */
pages.getIndex = function(req, res, next) {
    const options = {
        method: 'GET',
        uri: process.env.API_URL+'?json=get_posts&post_type=homepage-block&count=-1'
    };
    requestPromise(options)
        .then(function (response) {
            return contentModel.getHomepageBlockObjects(response);
        })
        .then(function(data) {
            res.render('pages/homepage', {
                meta: {
                    title: 'Mike Stumpf'
                },
                homepageBlocks: data
            });
        })
        .catch(function (error) {
            responseService.defaultCatch(error, next,'portfolio');
        });
};

pages.getPortfolioPage = function(req, res, next){
    const options = {
        method: 'GET',
        uri: process.env.API_URL+'?json=get_posts&post_type=portfolio-item&count=-1'
    };
    requestPromise(options)
        .then(function (response) {
            return contentModel.getPortfolioItemObjects(response);
        })
        .then(function(data) {
            res.render('pages/portfolio', {
                meta: {
                    title: utilService.metaTitlePrefix + 'Portfolio'
                },
                portfolioGroups: data
            });
        })
        .catch(function (error) {
            responseService.defaultCatch(error, next,'portfolio');
        });
};

pages.getResumePage = function(req, res, next) {
    res.render('pages/resume',{
        meta: {
            title: utilService.metaTitlePrefix+'Resume'
        }
    });
};

pages.getMusicPage = function(req, res, next) {
    const options = {
        method: 'GET',
        uri: process.env.API_URL+'?json=get_posts&post_type=music-post&count=-1'
    };
    requestPromise(options)
        .then(function (response) {
            return contentModel.getPortfolioItemObjects(response);
        })
        .then(function(data) {
            res.render('pages/music',{
                meta: {
                    title: utilService.metaTitlePrefix+'Music'
                },
                posts: data
            });
        })
        .catch(function (error) {
            responseService.defaultCatch(error, next,'portfolio');
        });
};

pages.getChorusPage = function(req, res, next) {
    res.render('pages/chorus',{
        meta: {
            title: utilService.metaTitlePrefix+'Chorus'
        }
    });
};

pages.getTravelPage = function(req, res, next) {
    res.render('pages/travel',{
        meta: {
            title: utilService.metaTitlePrefix+'Travel'
        },
        googleMapsApi: process.env.GOOGLE_MAPS_API
    });
};

/**
 error pages
 */
pages.get500Page = function(req, res, next) {
    res.render('errors/500',{
        meta: {
            title: utilService.metaTitlePrefix+'500'
        }
    });
};

pages.get404Page = function(req, res, next) {
    const translations = [
        'Me paenitet',//latin
        'I\'m sorry',//english
        'Przepraszam',//polish
        'Lo siento',//spanish
        'Je m\'excuse',//french
        'Mi dispiace',//italian
        'Es tut mir Leid'//german
    ];
    res.render('errors/404', {
        meta: {
            title: utilService.metaTitlePrefix+'404'
        },
        translations: _.shuffle(translations)
    });
};

module.exports = pages;