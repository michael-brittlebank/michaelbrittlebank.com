const //packages
    path = require('path'),
//services
    logService = require('../services/logs'),
    utilService = require('../services/util');

var utilMiddleware = {};

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