const //packages
    _ = require('lodash'),
    promise = require('bluebird'),
    sitemapPackage = require('sitemap'),
//variables
    msInSeconds = 1000,
    secondsInHour = 60,
    hoursInDay = 24,//todo, replace with moment
    sitemap = sitemapPackage.createSitemap({
        hostname : 'http://www.mikestumpf.com',
        cacheTime : msInSeconds * secondsInHour * hoursInDay * 2//keep the sitemap cached for 2 days
    });

var root = {};

function sendSiteMap(req, res, next){
    sitemap.toXML(function(err, xml){
        if (err){
            logger.error('sitemap to xml',JSON.stringify(err));
        }
        res.header('Content-Type', 'application/xml');
        res.send(xml);
    });
}
//
// function addUrlToSitemap(items, type){
//     var excludedUrls = [
//             '404',
//             '500'
//         ],
//         priority,
//         changeFrequency;
//     switch(type){
//         case contentfulService.contentTypes.page:
//             priority = 0.7;
//             changeFrequency = 'weekly';
//             break;
//         default:
//             priority = 0.5;
//             changeFrequency = 'monthly';
//             break;
//     }
//     items.forEach(function(entry){
//         if (entry.url.length > 0 && excludedUrls.indexOf(entry.url.replace(/\//g,'')) === -1){
//             sm.add({
//                 url : entry.url,
//                 changefreq :changeFrequency,
//                 priority: priority
//             });
//         }
//     });
// }

root.getSitemap = function(req, res, next) {
    // //only update the sitemap if the cache is expired
    // if (sm.isCacheValid()){
    sendSiteMap(req, res, next);
    // }
    // else{
    //     //remove every page from the expired sitemap
    //     sm.urls = [];
    //     var pageParams = {
    //             content_type: contentfulService.contentTypes.page,
    //             limit: 999
    //         },
    //         portfolioParams = {
    //             content_type: contentfulService.contentTypes.portfolio,
    //             limit: 999
    //         },
    //         postParams = {
    //             content_type: contentfulService.contentTypes.post,
    //             limit: 999
    //         };
    //     return promise
    //         .all([
    //             contentfulService.getEntries(pageParams),
    //             contentfulService.getEntries(portfolioParams),
    //             contentfulService.getEntries(postParams)
    //         ])
    //         .then(function (response) {
    //             var pageItems = [],
    //                 portfolioItems = [],
    //                 postItems = [];
    //             //page
    //             response[0].forEach(function(entry){
    //                 pageItems.push(contentService.pageDigest(entry));
    //             });
    //             addUrlToSitemap(pageItems,contentfulService.contentTypes.page);
    //             //portfolio
    //             response[1].forEach(function(entry){
    //                 portfolioItems.push(contentService.portfolioDigest(entry));
    //             });
    //             addUrlToSitemap(portfolioItems,contentfulService.contentTypes.portfolio);
    //             //post
    //             response[2].forEach(function(entry){
    //                 postItems.push(contentService.postDigest(entry));
    //             });
    //             addUrlToSitemap(postItems,contentfulService.contentTypes.post);
    //             sendSiteMap(req, res, next);
    //         })
    //         .catch(function (err) {
    //             //send empty site map on error
    //             logger.error('sitemap generator',JSON.stringify(err));
    //             sendSiteMap(req, res, next);
    //         });
    // }
};

root.getRobotsTxt = function(req, res, next) {
    res.sendFile('robots.txt', { root: path.join(__dirname, '../') });
};

module.exports = root;