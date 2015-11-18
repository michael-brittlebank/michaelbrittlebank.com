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
    logger = require('./lib/logger'),
/* routes and controllers */
    pageRoutes = require('./routes/pages.routes'),
    pageController = require('./controllers/pages.controller');

var app = express();

/**
 * Settings
 */
app.use(favicon(__dirname + '/public/images/favicon.ico'));

// view engine setup
var hbs = exphbs.create({
    defaultLayout: 'layout',
    extname: '.hbs',
    helpers: webapp.hbsHelpers
});
app.set('views', path.join(__dirname, 'views'));
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

app.use(express.static(path.join(__dirname, 'public')));

app.use(function(req, res, next) {
// routes middleware
    logger.log('info','calling route - '+req.method+' '+req.originalUrl);
    next();
});
/**
 * Routes
 */
app.use('/', pageRoutes);

/**
 * Error Handlers
 */
app.use(methodOverride());
app.use(function(err, req, res, next) {
    var status = err.status?err.status:webapp.status.internal_server_error;
    res.status(status);
    logger.log('error',status,JSON.stringify(err));
    if (!webapp.app.isLiveConfig()){
        res.json(err);
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