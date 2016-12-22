var winston = require('winston'),
    dailyRotateFile = require('winston-daily-rotate-file'),
    logger = new (winston.Logger)({
        transports: [
            new (winston.transports.Console)({
                json: false,
                timestamp: true,
                level: 'debug'
            }),
            new (dailyRotateFile)({
                colorize: 'true',
                filename: 'debug.log',
                dirname: './logs',
                datePattern: '.yyyy-MM-dd',
                maxsize: 20000
            })
        ],
        exceptionHandlers: [
            new (winston.transports.Console)({
                json: false,
                timestamp: true,
                level: 'debug' }),
            new winston.transports.File({
                filename: 'exceptions.log',
                dirname: './logs',
                maxsize: 20000
            })
        ],
        exitOnError: true
    });

module.exports = logger;