const //services
    errorService = require('./errors'),
    utilService = require('./util');

var response = {};

response.defaultCatch = function(error, next, message){
    const logService = require('./logs');
    if(!error || error.length < 1){
        error = message;
    } else if (error && error.hasOwnProperty('error')){
        error = error.error;
    }
    logService.error(error);
    if (error && utilService.simpleNullCheck(error, 'statusCode')) {
        switch (error.statusCode) {
            case utilService.status.notFound:
                next(new errorService.NotFoundError(error));
                break;
            case utilService.status.badRequest:
            case utilService.status.internalServerError:
            default:
                next(new errorService.InternalServerError(error));
                break;
        }
    } else {
        next(new errorService.InternalServerError(error));
    }
};

module.exports = response;