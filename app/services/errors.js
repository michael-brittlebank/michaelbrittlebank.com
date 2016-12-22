const // services
    utilService = require('./util');

var errors = {};
/**
 * Types of Errors
 */

var NotFoundError = function(message) {
    this.name = 'NotFound';
    this.message = message || 'Not Found';
    this.status = utilService.status.notFound;
};
NotFoundError.prototype = Object.create(Error.prototype);
NotFoundError.prototype.constructor = NotFoundError;
errors.NotFoundError = NotFoundError;

var InternalServerError = function(message) {
    this.name = 'InternalServerError';
    this.message = message || 'Internal Server Error';
    this.status = utilService.status.internalServerError;
};
InternalServerError.prototype = Object.create(Error.prototype);
InternalServerError.prototype.constructor = InternalServerError;
errors.InternalServerError = InternalServerError;

module.exports = errors;