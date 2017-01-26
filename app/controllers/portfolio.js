const /* packages */
    _ = require('lodash'),
    promise = require('bluebird'),
//services
    responseService = require('../services/response'),
    cacheService = require('../services/cache'),
    contentService = require('../services/content'),
    errorService = require('../services/errors');

var portfolio = {};

portfolio.getPortfolioPage = function(req, res, next){
    promise.all([
        contentService.getCachedPageByUrl(req.originalUrl),
        cacheService.getCachedPortfolioItems(),
        cacheService.getCachedQuotes()
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
            //sort data groups alphabetically
            sortedData = _.sortBy(sortedData,'title');
            res.render('portfolio/page', {
                page: data[0],
                portfolioGroups: sortedData,
                quotes: _.shuffle(data[2])
            });
        })
        .catch(function (error) {
            responseService.defaultCatch(error, next,'portfolio');
        });
};

portfolio.getPortfolioItem = function(req, res, next) {
    contentService.getCachedPortfolioItemByUrl(req.originalUrl)
        .then(function(data) {
            switch(data.url){
                case '/portfolio/reading-list':
                    res.render('portfolio/reading-list',{
                        page: data
                    });
                    break;
                case '/portfolio/bubbles':
                    res.render('portfolio/bubbles',{
                        page: data
                    });
                    break;
                default:
                    next(new errorService.NotFoundError('portfolio item template not found'));
            }
        })
        .catch(function (error) {
            responseService.defaultCatch(error, next,'portfolio item');
        });
};

module.exports = portfolio;