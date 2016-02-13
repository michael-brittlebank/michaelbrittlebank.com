var /* packages */
    compression =require('compression'),
    exphbs = require('express-handlebars'),
    express = require('express'),
    favicon = require('serve-favicon'),
    helmet = require('helmet'),
    contentLength = require('express-content-length-validator'),
    methodOverride = require('method-override'),
    path = require('path'),
    bodyParser = require('body-parser'),
    redirect = require("express-redirect"),
    mobileDetect = require('mobile-detect'),
/* config */
    config = require('./config/config'),
/* services */
    webapp = require('./services/webapp.service'),
    logger = require('./services/logger.service'),
    contentfulService = require('./services/contentful.service'),
    contentService = require('./services/content.service'),
    errorService = require('./services/error.service'),
/* routes and controllers */
    pageRoutes = require('./routes/pages.routes'),
    portfolioRoutes = require('./routes/portfolio.routes'),
    localRoutes = require('./routes/local.routes'),
    apiRoutes = require('./routes/api.routes'),
    postRoutes = require('./routes/post.routes'),
    rootRoutes = require('./routes/root.routes'),
    pageController = require('./controllers/pages.controller');

var app = express();

//Remove trailing slashes
app.use(function(req, res, next) {
    //http://stackoverflow.com/questions/13442377/redirect-all-trailing-slashes-gloablly-in-express
    if(req.url.slice(0, -1) == '/' && req.url.length > 1)
        res.redirect(301, req.url.slice(0, -1));
    else
        next();
});

/**
 * SEO Redirects
 */
redirect(app);

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

/**
 * Settings
 */

//security extensions
app.use(helmet());
app.use(contentLength.validateMax({max: 9999}));

//parse form data
app.use( bodyParser.json() );       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
    extended: true
}));

//favicon
app.use(favicon(__dirname + '/webapp/public/images/favicon.ico'));

// view engine setup
var hbs = exphbs.create({
    defaultLayout: 'layout',
    extname: '.hbs',
    helpers: webapp.hbsHelpers,
    layoutsDir: 'webapp/views/layouts',
    partialsDir: 'webapp/views/partials'
});
app.set('views', path.join(__dirname, 'webapp/views'));
app.engine('.hbs', hbs.engine);
app.set('view engine', '.hbs');

//gzip
app.use(compression({
    // only compress files for the following content types
    filter: function(req, res) {
        return (/json|text|javascript|css/).test(res.getHeader('Content-Type'));
    },
    // zlib option for compression level
    level: 3
}));

//static files directory
app.use(express.static(path.join(__dirname, 'webapp/public'),{
    index: false,
    maxAge: webapp.app.isLiveConfig()?'7 days':0
}));

if (!webapp.app.isLiveConfig()){
    //for debugging included libs
    app.use('/bower_components', express.static(path.join(__dirname, 'webapp/bower_components')));
}

app.use(function(req, res, next) {
    //todo, test for contentful connection
// routes middleware
    logger.info('calling route - '+req.method+' '+req.originalUrl);
    var includedRoutes = [
    ];
    var excludedRoutes = [
    ];
    if (includedRoutes.indexOf(req.url) !== -1 || (req.url.indexOf('/api') === -1 && excludedRoutes.indexOf(req.url) === -1)) {
        if (!webapp.app.isLocalConfig()) {
            var params = {
                content_type: contentfulService.contentTypes.menu
            };
            return contentfulService.getEntries(params)
                .then(function (response) {
                    global.webapp = {
                        md: new mobileDetect(req.headers['user-agent'])
                    };
                    res.locals.menu = contentService.menuArrayDigest(response);
                    res.locals.meta = {
                        siteName: config.app.hostName,
                        requestedUrl: config.app.protocol + config.app.hostName + req.originalUrl
                    };
                    res.locals.site = {
                        linkedIn: config.social.linkedIn,
                        github: config.social.github,
                        stackOverflow: config.social.stackOverflow,
                        url: config.app.protocol + config.app.serverUrl + ':' + config.app.serverPort,
                        menuHighlight: webapp.getMenuHighlight(req.originalUrl)
                    };
                    res.locals.config = {
                        googleMapsApiKey: config.google.mapsApi
                    };
                    next();
                })
                .catch(function (err) {
                    logger.error('Contentful client error', JSON.stringify(err));
                    return next(err);
                });
        }
    }
    next();
});
/**
 * Routes
 */
if (webapp.app.isLocalConfig()){
    app.use('/', localRoutes);
}
else {
    app.use('/portfolio/*', portfolioRoutes);
    app.use('/music/*', postRoutes);
    app.use('/api', apiRoutes);
    app.use('/', rootRoutes, pageRoutes);
}

/**
 * Error Handlers
 */
// catch 404 and forward to error handler
app.use(function(req, res, next) {
    next(new errorService.NotFoundError('not found error - '+req.method+' '+req.originalUrl));
});

// error handlers
app.use(function (err, req, res, next) {
    logger.error('',JSON.stringify(err));
    if (webapp.simpleNullCheck(err,'status') && err.status === webapp.status.notFound){
        pageController.get404Page(req, res, next);
    }
    else {
        pageController.get500Page(req, res, next);
    }
});


/**
 * Server start
 */
app.set('port', config.app.serverPort || 3000);
var server = app.listen(app.get('port'), function() {
    logger.info('Server listening at http://' + config.app.serverUrl + ':' + server.address().port);
});