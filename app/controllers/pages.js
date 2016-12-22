const /* packages */
    _ = require('lodash'),
    promise = require('bluebird'),
//services
    utilService = require('../services/util');

var pages = {};

/**
 * Main Routes
 */
pages.getIndex = function(req, res, next) {
    console.log('got here');
    // var params = {
    //     content_type: contentfulService.contentTypes.page,
    //     'fields.url[in]': 'index',
    //     limit: 1
    // };
    // return promise
    //     .all([contentfulService.getEntries(params)])
    //     .then(function (response) {
    //         var content = response[0];
    //         res.locals.page = contentService.pageDigest(content);
    res.render('pages/homepage', {
        meta: {
            title: 'Mike Stumpf'
        },
        layout: 'homepage'
    });
    // })
    // .catch(function (err) {
    //     next(err);
    // });
};

pages.getPortfolioPage = function(req, res, next){
    // var portfolioParams = {
    //         content_type: contentfulService.contentTypes.portfolio,
    //         limit: 999
    //     },
    //     quoteParams = {
    //         content_type: contentfulService.contentTypes.quote,
    //         limit: 999
    //     };
    // return promise
    //     .all([
    //         contentfulService.getEntries(portfolioParams),
    //         contentfulService.getEntries(quoteParams)
    //     ])
    //     .then(function (response) {
    //         var portfolioItems = [],
    //             processedItems = [],
    //             quoteItems = [];
    //         //portfolio
    //         response[0].forEach(function(entry){
    //             portfolioItems.push(contentService.portfolioDigest(entry));
    //         });
    //         portfolioItems = _.groupBy(portfolioItems,function(entry){
    //             return entry.portfolioGroup;
    //         });
    //         for(var key in portfolioItems){
    //             processedItems.push({
    //                 name: key,
    //                 items: portfolioItems[key]
    //             });
    //         }
    //         res.locals.portfolio = _.sortBy(processedItems, 'name');
    //         //quotes
    //         response[1].forEach(function(entry){
    //             quoteItems.push(contentService.quoteDigest(entry));
    //         });
    //         res.locals.quote = _.sample(quoteItems);
    res.render('pages/portfolio',{
        meta: {
            title: utilService.metaTitlePrefix+'Portfolio'
        }
    });
    // })
    // .catch(function (err) {
    //     next(err);
    // });
};

pages.getResumePage = function(req, res, next) {
    res.render('pages/resume',{
        meta: {
            title: utilService.metaTitlePrefix+'Resume'
        }
    });
};

pages.getMusicPage = function(req, res, next) {
    // var params = {
    //     content_type: contentfulService.contentTypes.post,
    //     'fields.postDate[lt]': new Date().toISOString(),
    //     order: '-fields.postDate',
    //     limit: 20
    // };
    // return promise
    //     .all([contentfulService.getEntries(params)])
    //     .then(function (response) {
    //         var content = response[0];
    //         res.locals.posts = _.values(contentService.postArrayDigest(content));
    res.locals.group = 1;
    //     res.render('page-music');
    // })
    // .catch(function (err) {
    //     next(err);
    // });
};

pages.getChorusPage = function(req, res, next) {
    res.render('pages/chorus',{
        meta: {
            title: utilService.metaTitlePrefix+'Chorus'
        }
    });
};

pages.getTravelPage = function(req, res, next) {
    // var params = {
    //     content_type: contentfulService.contentTypes.album,
    //     'fields.title[in]': 'Travel',
    //     limit: 1
    // };
    // return promise
    //     .all([contentfulService.getEntries(params)])
    //     .then(function (response) {
    //         var content = response[0];
    //         res.locals.album = contentService.albumDigest(content);
    res.locals.googleMaps = true;
    res.render('pages/travel',{
        meta: {
            title: utilService.metaTitlePrefix+'Travel'
        }
    });
    // })
    // .catch(function (err) {
    //     next(err);
    // });
};

pages.getDefaultPage = function(req, res, next) {
    // var params = {
    //     content_type: contentfulService.contentTypes.page,
    //     'fields.url[in]': req.originalUrl.replace(/^\/|\/$/g, ''),
    //     limit: 1
    // };
    // return promise
    //     .all([contentfulService.getEntries(params)])
    //     .then(function (response) {
    //         var page = contentService.pageDigest(response[0]);
    //         res.locals.page = page;
    //         if (webapp.simpleNullCheck(page, 'layout')) {
    //             switch (page.layout) {
    //                 case 'Portfolio':
    //                     pages.getPortfolioPage(res, res, next);
    //                     break;
    //                 case 'Resume':
    //                     pages.getResumePage(res, res, next);
    //                     break;
    //                 case 'Music':
    //                     pages.getMusicPage(res, res, next);
    //                     break;
    //                 case 'Travel':
    //                     pages.getTravelPage(res, res, next);
    //                     break;
    //                 case 'Chorus':
    //                     pages.getChorusPage(res, res, next);
    //                     break;
    //                 default:
    //                     res.render('single-page');
    //             }
    //         } else {
    res.render('pages/default');
    //         }
    //     })
    //     .catch(function (err) {
    //         next(err);
    // });
};

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