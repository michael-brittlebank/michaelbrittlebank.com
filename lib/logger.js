var winston = require('winston'),
    logger = new (winston.Logger)({
        transports: [
            new (winston.transports.Console)({ json: false, timestamp: true, level: 'debug' }),
            new winston.transports.File({ filename: 'debug.log', json: false })
        ],
        exceptionHandlers: [
            new (winston.transports.Console)({ json: false, timestamp: true, level: 'debug' }),
            new winston.transports.File({ filename: 'exceptions.log', json: false })
        ],
        exitOnError: true
    });

module.exports = logger;