const //packages
    winston = require('winston'),
    moment = require('moment');

winston.emitErrs = true;

const logService = new winston.Logger({
    transports: [
        new winston.transports.Console({
            timestamp: function() {
                return (moment().format('DD MMM HH:mm:ss'));
            },
            name: 'console-error',
            level: 'error',
            handleExceptions: true,
            humanReadableUnhandledException: true,
            json: false,
            colorize: true
        }),
        new winston.transports.Console({
            timestamp: function() {
                return (moment().format('DD MMM HH:mm:ss'));
            },
            name: 'console-info',
            level: 'info',
            handleExceptions: true,
            humanReadableUnhandledException: true,
            json: false,
            colorize: true
        })
    ],
    exitOnError: true
});

module.exports = logService;