const //packages
    path = require('path'),
//services
    logService = require('../services/logs'),
    utilService = require('../services/util');

var utilMiddleware = {};

utilMiddleware.redirectHistoricalLinks = function(app){
//resume
    app.redirect('/portfolio/university-of-wisconsin-madison', '/cv');
    app.redirect('/portfolio/portfolio/university-of-york', '/cv');
    app.redirect('/about', '/cv');
    app.redirect('/contact', '/cv');
    app.redirect('/search', '/cv');
    app.redirect('/professional', '/cv');
    app.redirect('/education', '/cv');
    app.redirect('/resume', '/cv');
    app.redirect('/files/Mike%20Stumpf%20Resume.pdf','/files/Mike_Stumpf_CV.pdf');

//portfolio
    app.redirect('/portfolio/chorus', '/chorus');
    app.redirect('/portfolio/wp-reading-list', '/portfolio');
    app.redirect('/portfolio/strange-bedfellows', '/portfolio');
    app.redirect('/portfolio/docuscope-project', '/portfolio');
    app.redirect('/portfolio/portfolio/open-oasis', '/portfolio');
    app.redirect('/portfolio/portfolio/the-humanities-research-center-blog-the-treehouse', '/portfolio');
    app.redirect('/portfolio/early-modern-sandbox', '/portfolio');
    app.redirect('/portfolio/all-is-true', '/portfolio');
    app.redirect('/portfolio/artls-database', '/portfolio');
    app.redirect('/portfolio/the-spaces-of-arts-conference-website', '/portfolio');
    app.redirect('/portfolio/student-wisconsin-education-association/', '/portfolio');
    app.redirect('/personal', '/portfolio');
    app.redirect('/reading-list', '/portfolio');
    app.redirect('/scales', '/chorus');

//home
    app.redirect('/thank-you', '/');

//travel
    app.redirect('/places', '/travel');

//sitemap
    app.redirect('/sitemap', '/sitemap.xml');

    return app;
};

utilMiddleware.removeTrailingSlashes = function(req, res, next) {
    //http://stackoverflow.com/questions/13442377/redirect-all-trailing-slashes-gloablly-in-express
    if(req.url.slice(0, -1) == '/' && req.url.length > 1) {
        res.redirect(301, req.url.slice(0, -1));
    } else {
        next();
    }
};

utilMiddleware.debugLibraries = function(app, express){
    if(utilService.isLocalConfig()) {
        app.use('/webapp/bower_components', express.static(path.join(__dirname, 'webapp/bower_components')));
    }
    return app;
};

utilMiddleware.debugRequests = function(req,res,next){
    if(utilService.isLocalConfig()){
        logService.info('Calling '+req.method+' '+req.originalUrl);
    }
    next();
};

module.exports = utilMiddleware;