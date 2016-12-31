const //packages
    _ = require('lodash'),
    promise = require('bluebird'),
//models
    contentModel = require('../models/content'),
//services
    utilService = require('../services/util'),
    responseService = require('../services/response'),
    cacheService = require('../services/cache'),
    contentService = require('../services/content');

var pages = {};

/*
 main pages
 */
pages.getIndex = function(req, res, next) {
    promise.all([
        contentService.getCachedPageByUrl(req.originalUrl),
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
    contentService.getCachedPageByUrl(req.originalUrl)
        .then(function(data) {
            res.render('pages/resume', {
                page: data
            });
        })
        .catch(function (error) {
            responseService.defaultCatch(error, next,'resume');
        });
};

pages.getChorusPage = function(req, res, next) {
    contentService.getCachedPortfolioItemByUrl(req.originalUrl)
        .then(function(data){
            res.render('portfolio/chorus',{
                page: data
            });
        })
        .catch(function (error) {
            responseService.defaultCatch(error, next,'chorus');
        });
};

pages.getTravelPage = function(req, res, next) {
    promise.all([
        contentService.getCachedPageByUrl(req.originalUrl),
        cacheService.getCachedTravelImages()
    ])
        .then(function(data) {
            res.render('pages/travel',{
                page: data[0],
                images: _.shuffle(data[1]),
                googleMapsApi: process.env.GOOGLE_MAPS_API
            });
        })
        .catch(function (error) {
            responseService.defaultCatch(error, next,'travel');
        });
};

/*
 error pages
 */
pages.get500Page = function(req, res, next) {
    contentModel.getPageObject(JSON.stringify({title:'Error'}))
        .then(function(response){
            res.render('errors/500',{
                page: response
            });
        })
        .catch(function (error) {
            responseService.defaultCatch(error, next,'500');
        });
};

pages.get404Page = function(req, res, next) {
    contentModel.getPageObject(JSON.stringify({title:'Not Found'}))
        .then(function(response){
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
                page: response,
                translations: _.shuffle(translations)
            });
        })
        .catch(function (error) {
            responseService.defaultCatch(error, next,'404');
        });
};

module.exports = pages;