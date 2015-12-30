var /* packages */
    _ = require('lodash'),
    promise = require('bluebird'),
    sitemap = require('sitemap'),
/* services */
    contentfulService = require('../services/contentful.service'),
    contentService = require('../services/content.service'),
    webapp = require('../services/webapp.service'),
    logger = require('../services/logger.service'),
    config = require('../config/config'),
    sm = sitemap.createSitemap({
        hostname : config.app.protocol+config.app.hostName,
        cacheTime : 1000 * 60 * 24  //keep the sitemap cached for 24 hours
    }),
    root = {};

function addPostsToSitemap(posts){
    for (var post in posts){
        sm.add({
            url : config.app.protocol + '/' +  posts[post].created.getFullYear()  + '/' + (posts[post].created.getMonth() + 1) + '/'+ posts[post].slug,
            changefreq :'daily'
        });
    }
}

root.getSitemap = function(req, res, next) {
    //only update the sitemap if the cache is expired
    if (sm.isCacheValid()){
        console.log('sm cached');
        sm.toXML(function(xml){
            res.header('Content-Type', 'application/xml');
            res.send(xml);
        });
    }
    else{
        console.log('sm not cached');
        //remove every page from the expired sitemap
        sm.urls = [];

        //get every post from the database
        //addPostsToSitemap(function(err, posts){
        //    //if some error occurs, generate an empty sitemap instead of aborting
        //    if (err){
        //        console.log(err);
        //    }
        //    else{
        //        addPostsToSitemap(posts);
        //    }

            sm.toXML(function(xml){
                res.header('Content-Type', 'application/xml');
                res.send(xml);
            });
        //});
    }
};

module.exports = root;