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
/* routes and controllers */
    pageRoutes = require('./routes/pages.routes');

var app = express();

/**
 * Settings
 */
app.use(favicon(__dirname + '/public/images/favicon.ico'));

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.engine('.hbs',exphbs({defaultLayout: 'layout', extname: '.hbs'}));
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

/**
 * Routes
 */
app.use('/', pageRoutes);

/**
 * Error Handlers
 */
app.use(methodOverride());
app.use(function(err, req, res, next) {
    console.error(err.stack);
    next(err);
});
app.use(function(err, req, res, next) {
    var status = err.status?err.status:webapp.status.internal_server_error;
    res.status(status);
    if (!webapp.app.isLiveConfig()){
        res.json(err);
    }
    else {
        if (err.status === webapp.status.not_found){
            res.locals.meta = {
                title: '404 page',
                description: '404 not found'
            };
            res.locals.page = {
                title: '404 page',
                body: 'not found'
            };
            return res.render('404');
        }
        else {
            res.locals.meta = {
                title: '500 page',
                description: '500 error'
            };
            res.locals.page = {
                title: '500 error page',
                body: '500 body'
            };
            return res.render('500');
        }
    }
});

/**
 * Server start
 */
var server = app.listen(3000, function () {
    console.log('App listening at '+config.app.serverUrl+' on port '+config.app.serverPort);
});