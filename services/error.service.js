var /* services */
    webapp = require('./webapp.service'),
    logger = require('./logger.service'),
    errors = {};
/**
 * Types of Errors
 */

var NotFoundError = function(message) {
    this.name = 'NotFound';
    this.message = message || 'Not Found';
    this.status = webapp.status.notFound;
};
NotFoundError.prototype = Object.create(Error.prototype);
NotFoundError.prototype.constructor = NotFoundError;
errors.NotFoundError = NotFoundError;

var InternalServerError = function(message) {
    this.name = 'InternalServerError';
    this.message = message || 'Internal Server Error';
    this.status = webapp.status.internalServerError;
};
InternalServerError.prototype = Object.create(Error.prototype);
InternalServerError.prototype.constructor = InternalServerError;
errors.InternalServerError = InternalServerError;

module.exports = errors;