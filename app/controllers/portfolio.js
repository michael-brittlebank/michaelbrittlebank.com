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
    // var params = {
    //     content_type: contentfulService.contentTypes.portfolio,
    //     'fields.url[in]': req.originalUrl.replace('/portfolio', '').replace(/^\/|\/$/g, ''),
    //     limit: 1
    // };
    // return promise
    //     .all([contentfulService.getEntries(params)])
    //     .then(function (response) {
    //         var page = contentService.portfolioDigest(response[0]);
    //         res.locals.page = page;
    //         if (webapp.simpleNullCheck(page, 'layout')) {
    //             switch (page.layout) {
    //                 case 'Bubbles':
    //                     res.render('portfolio-bubbles');
    //                     break;
    //                 case 'Reading List':
    //                     res.render('portfolio-reading-list');
    //                     break;
    //                 default:
    //                     res.render('single-portfolio');
    //             }
    //         } else {
                res.render('portfolio/default');
        //     }
        // })
        // .catch(function (err) {
        //     next(err);
        // });
};

module.exports = portfolio;