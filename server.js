var /* packages */
    compression =require('compression'),
    exphbs = require('express-handlebars'),
    express = require('express'),
    favicon = require('serve-favicon'),
    helmet = require('helmet'),
    contentLength = require('express-content-length-validator'),
    path = require('path'),
    bodyParser = require('body-parser'),
    redirect = require('express-redirect'),
    mobileDetect = require('mobile-detect'),
/* config */
    config = require('./app/config/config'),
//middleware
    utilMiddleware = require('./app/middleware/util'),
/* services */
    webapp = require('./app/services/webapp.service'),
    logger = require('./app/services/logger.service'),
    contentfulService = require('./app/services/contentful.service'),
    contentService = require('./app/services/content.service'),
    errorService = require('./app/services/error.service'),
/* routes and controllers */
    pageRoutes = require('./app/routes/pages.routes'),
    portfolioRoutes = require('./app/routes/portfolio.routes'),
    apiRoutes = require('./app/routes/api.routes'),
    postRoutes = require('./app/routes/post.routes'),
    rootRoutes = require('./app/routes/root.routes'),
    pageController = require('./app/controllers/pages.controller');

var app = express();

//helper middleware
redirect(app);
app.use(utilMiddleware.removeTrailingSlashes,utilMiddleware.redirectHistoricalLinks);

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
app.use('/portfolio/*', portfolioRoutes);
app.use('/music/*', postRoutes);
app.use('/api', apiRoutes);
app.use('/', rootRoutes, pageRoutes);

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