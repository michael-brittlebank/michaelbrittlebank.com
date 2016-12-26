const /* packages */
    _ = require('lodash'),
    promise = require('bluebird'),
//services
    utilService = require('../services/util'),
    responseService = require('../services/response'),
    cacheService = require('../services/cache'),
    contentService = require('../services/content');

var pages = {};

/**
 main pages
 */
pages.getIndex = function(req, res, next) {
    promise.all([
        contentService.getCachedPageByUrl('/'),
        cacheService.getCachedHomepageBlocks()
    ])
        .then(function(data) {
            res.render('pages/homepage', {
                page: data[0],
                homepageBlocks: data[1]
            });
        })
        .catch(function (error) {
            responseService.defaultCatch(error, next,'homepage');
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
    cacheService.getCachedMusicPosts()
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
    cacheService.getCachedTravelImages()
        .then(function(data) {
            res.render('pages/travel',{
                meta: {
                    title: utilService.metaTitlePrefix+'Travel'
                },
                googleMapsApi: process.env.GOOGLE_MAPS_API,
                images: data
            });
        })
        .catch(function (error) {
            responseService.defaultCatch(error, next,'portfolio');
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