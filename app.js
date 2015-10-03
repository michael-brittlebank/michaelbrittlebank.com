var //app packages
    compression =require('compression'),
    exphbs = require('express-handlebars'),
    express = require('express'),
    favicon = require('serve-favicon'),
    path = require('path'),
    //routes and controllers
    pages = require('./routes/pages.routes');

var app = express();

// Setting application local variables
app.use(favicon(__dirname + '/public/images/favicon.ico'));

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.engine('.hbs',exphbs({defaultLayout: 'layout', extname: '.hbs'}));
app.set('view engine', '.hbs');

// Should be placed before express.static
app.use(compression({
    // only compress files for the following content types
    filter: function(req, res) {
        return (/json|text|javascript|css/).test(res.getHeader('Content-Type'));
    },
    // zlib option for compression level
    level: 3
}));

app.use(express.static(path.join(__dirname, 'public')));

app.use(function(err, req, res, next) {
    res.status(err.status || zero.status.internal_server_error);
    if (err.status === zero.status.not_found){
        res.render('404', {
            message: err.message,
            error: err
        });
    }
    else {
        res.render('500', {
            message: err.message,
            error: err
        });
    }
});

app.use('/', pages);

var server = app.listen(3000, function () {
    var host = server.address().address;
    var port = server.address().port;

    console.log('App listening');
});