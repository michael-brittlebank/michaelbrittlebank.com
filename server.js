const //packages
    express = require('express'),
    handlebars = require('express-handlebars'),
    cors = require('cors'),
    favicon = require('serve-favicon'),
    helmet = require('helmet'),
    bodyParser = require('body-parser'),
    path = require('path'),
    compression = require('compression'),
    expressValidator = require('express-validator'),
    contentLength = require('express-content-length-validator'),
    redirect = require('express-redirect'),
    moment = require('moment'),
//services
    utilService = require('./app/services/util'),
    logService = require('./app/services/logs'),
    errorService = require('./app/services/errors'),
// routes
    pageRoutes = require('./app/routes/pages'),
    portfolioRoutes = require('./app/routes/portfolio'),
    apiRoutes = require('./app/routes/api'),
    postRoutes = require('./app/routes/posts'),
    rootRoutes = require('./app/routes/root'),
//controllers
    pageController = require('./app/controllers/pages'),
//middleware
    utilMiddleware = require('./app/middleware/util'),
//variables
    port = process.env.NODE_PORT || 3000;

var app = express();

/**
 * settings
 */

//cors
app.use(cors());
app.options('*', cors());

//security extensions
app.use(helmet());
app.use(contentLength.validateMax({max: 9999}));

//favicon
app.use(favicon(__dirname + '/webapp/public/images/favicon.ico'));

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
    maxAge: utilService.isLocalConfig()?0:'7 days'
}));

//helper middleware
redirect(app);
app.use(utilMiddleware.removeTrailingSlashes);
app = utilMiddleware.debugLibraries(utilMiddleware.redirectHistoricalLinks(app), express);
app.use(utilMiddleware.debugRequests);

//parse form data
app.use(bodyParser.json());// to support JSON-encoded bodies
app.use(bodyParser.urlencoded({
// to support URL-encoded bodies
    extended: true
}));
app.use(expressValidator());


/**
 *  view engine
 */
app.engine('.hbs', handlebars({
    defaultLayout: 'main',
    extname: '.hbs',
    helpers: utilService.hbsHelpers,
    layoutsDir: 'webapp/views/layouts',
    partialsDir: 'webapp/views/partials'
}));

app.set('view engine', '.hbs');
app.set('views', path.join(__dirname, 'webapp/views'));

/**
 * routes
 */
// app.use('/portfolio/*', portfolioRoutes);
// app.use('/music/*', postRoutes);
// app.use('/api', apiRoutes);
app.use('/', rootRoutes, pageRoutes);

/**
 * error handlers
 */
// catch 404 and forward to error handler
app.use(function(req, res, next) {
    //404 handler
    logService.error('not found - '+req.method+' '+req.originalUrl);
    next(new errorService.NotFoundError(req.method+' '+req.originalUrl));
});

// error handlers
app.use(function (error, req, res, next) {
    logService.error('',JSON.stringify(error));
    //page request errors
    if (error && utilService.simpleNullCheck(error, 'statusCode')) {
        switch (error.statusCode) {
            case utilService.status.notFound:
                pageController.get404Page(req, res, next);
                break;
            case utilService.status.badRequest:
            case utilService.status.internalServerError:
            default:
                pageController.get500Page(req, res, next);
                break;
        }
    } else {
        pageController.get500Page(req, res, next);
    }
});


/**
 *  Start server
 */
app.listen(port, function() {
    logService.info('Node server started on port '+port+' at '+moment().format());
    //todo, connected to mysql db?
    // logService.info('Using API server: '+process.env.API_URL);
});