var /* packages */
    compression =require('compression'),
    exphbs = require('express-handlebars'),
    express = require('express'),
    favicon = require('serve-favicon'),
    methodOverride = require('method-override'),
    path = require('path'),
/* config */
    config = require('./config/config'),
/* services */
    webapp = require('./services/webapp.service'),
    logger = require('./services/logger.service'),
    contentfulService = require('./services/contentful.service'),
    contentService = require('./services/content.service'),
/* routes and controllers */
    pageRoutes = require('./routes/pages.routes'),
    localRoutes = require('./routes/local.routes'),
    pageController = require('./controllers/pages.controller');

var app = express();

/**
 * Settings
 */
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

app.use(compression({
    // only compress files for the following content types
    filter: function(req, res) {
        return (/json|text|javascript|css/).test(res.getHeader('Content-Type'));
    },
    // zlib option for compression level
    level: 3
}));

app.use(express.static(path.join(__dirname, 'webapp/public')));

app.use(function(req, res, next) {
// routes middleware
    logger.log('info','calling route - '+req.method+' '+req.originalUrl);
    if (!webapp.app.isLocalConfig()) {
        var params = {
            content_type: contentfulService.contentTypes.menu
        };
        return contentfulService.getEntries(params)
            .then(function (response) {
                res.locals.menu = contentService.menuDigest(response);
                res.locals.meta = {
                    siteName: config.app.hostName,
                    requestedUrl: config.app.protocol + config.app.hostName + req.originalUrl
                };
                res.locals.site = {
                    linkedIn: 'https://www.linkedin.com/in/mikestumpf',
                    github: 'https://github.com/mike-stumpf',
                    music: config.app.protocol + config.app.hostName + '/scales'
                };
                next();
            })
            .catch(function (err) {
                logger.log('error', 'Contentful client error', JSON.stringify(err));
                return next(err);
            });
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
    app.use('/', pageRoutes);
}

/**
 * Error Handlers
 */
// catch 404 and forward to error handler
app.use(function(req, res, next) {
    logger.log('error','not found error - '+req.method+' '+req.originalUrl);
    var err = new Error('Not Found');
    err.status = webapp.status.not_found;
    next(err);
});

// error handlers
app.use(function (err, req, res, next) {
    logger.log('error','internal server error',JSON.stringify(err));
    var code = err.status || webapp.status.internal_server_error;
    if (!webapp.app.isLiveConfig()) {
        return res.status(code).json({
            error: true,
            code: code,
            data: {message: err.message}
        });
    }
    else {
        if (err.status === webapp.status.not_found){
            pageController.get404Page(req, res, next);
        }
        else {
            pageController.get500Page(req, res, next);
        }
    }
});


/**
 * Server start
 */
app.set('port', config.app.serverPort || 3000);
var server = app.listen(app.get('port'), function() {
    logger.log('info','Server listening at http://' + config.app.serverUrl + ':' + server.address().port);
});