const /* packages */
    _ = require('lodash'),
    promise = require('bluebird'),
//services
    responseService = require('../services/response'),
    cacheService = require('../services/cache'),
    contentService = require('../services/content');

var portfolio = {};

portfolio.getPortfolioPage = function(req, res, next){
    promise.all([
        contentService.getCachedPageByUrl(req.originalUrl),
        cacheService.getCachedPortfolioItems()
    ])
        .then(function(data) {
            var unsortedData,
                sortedData = {};
            //sort data items by portfolio group
            unsortedData = _.groupBy(data[1], 'portfolioGroup');
            //create portfolio group data object
            Object.keys(unsortedData).forEach(function(key){
                sortedData[key] = {
                    title: key,
                    items: unsortedData[key]
                }
            });
            res.render('pages/portfolio', {
                page: data[0],
                portfolioGroups: sortedData
            });
        })
        .catch(function (error) {
            responseService.defaultCatch(error, next,'portfolio');
        });
};

portfolio.getPortfolioItem = function(req, res, next) {
    contentService.getCachedPortfolioItemByUrl(req.originalUrl)
        .then(function(data) {
            res.render('portfolio/default',{
                page: data
            });
        })
        .catch(function (error) {
            responseService.defaultCatch(error, next,'portfolio item');
        });
};

module.exports = portfolio;