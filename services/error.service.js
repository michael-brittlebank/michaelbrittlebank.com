var /* services */
    webapp = require('./webapp.service');
/**
 * Types of Errors
 */

var NotFoundError = function(message) {
    this.name = 'NotFound';
    this.message = message || 'Not Found';
    this.status = webapp.status.not_found;
};

NotFoundError.prototype = Object.create(Error.prototype);
NotFoundError.prototype.constructor = NotFoundError;
module.exports.NotFoundError = NotFoundError;

var InternalServerError = function(message) {
    this.name = 'InternalServerError';
    this.message = message || 'Internal Server Error';
    this.status = webapp.status.internal_server_error;
};

InternalServerError.prototype = Object.create(Error.prototype);
InternalServerError.prototype.constructor = InternalServerError;
module.exports.InternalServerError = InternalServerError;


