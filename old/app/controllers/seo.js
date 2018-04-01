const //packages
    _ = require('lodash'),
    promise = require('bluebird'),
    sitemapPackage = require('sitemap'),
    path = require('path'),
    moment = require('moment'),
//services
    cacheService = require('../services/cache'),
    responseService = require('../services/response'),
    utilService = require('../services/util'),
//models
    contentModel = require('../models/content'),
//variables
    sitemap = sitemapPackage.createSitemap({
        hostname : 'http://www.mikestumpf.com',
        cacheTime : moment.duration(1, 'week').asMilliseconds()
    });

var root = {};

function sendSiteMap(req, res, next){
    sitemap.toXML(function(error, xml){
        if (error){
            responseService.defaultCatch(error, next,'sitemap to xml');
        } else {
            res.header('Content-Type', 'application/xml');
            res.send(xml);
        }
    });
}

function addUrlsToSitemap(items, type){
    var excludedUrls = [
            '404',
            '500'
        ],
        priority,
        changeFrequency = 'monthly';
    switch(type){
        case 'page':
            priority = 1;
            break;
        default:
            priority = 0.7;
            break;
    }
    _.each(items, function(entry){
        if (utilService.simpleNullCheck(entry, 'url') && excludedUrls.indexOf(entry.url.replace(/\//g,'')) === -1){
            sitemap.add({
                url : entry.url,
                changefreq :changeFrequency,
                priority: priority
            });
        }
    });
}

root.getSitemap = function(req, res, next) {
    //only update the sitemap if the cache is expired
    if (sitemap.isCacheValid()){
        sendSiteMap(req, res, next);
    } else {
        return promise
            .all([
                cacheService.getCachedPages(),
                cacheService.getCachedPortfolioItems(),
                cacheService.getCachedMusicPosts()
            ])
            .then(function(data){
                //page
                addUrlsToSitemap(data[0],'page');
                //portfolio items
                addUrlsToSitemap(data[1]);
                //music posts
                addUrlsToSitemap(data[2]);
                sendSiteMap(req, res, next);
            })
            .catch(function (error) {
                responseService.defaultCatch(error, next,'get sitemap');
            });
    }
};

root.getRobotsTxt = function(req, res, next) {
    res.sendFile('robots.txt', { root: path.join(__dirname, '../../') });
};

module.exports = root;