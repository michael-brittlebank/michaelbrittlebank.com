const //packages
    utilService = require('./util');

var logService = {};

logService.error = function(error){
    if(utilService.isLocalConfig()){
        console.log('----------- ERROR -----------',error);
    }
};

logService.info = function(info){
    if(utilService.isLocalConfig()){
        console.log('----------- INFO -----------',info);
    }
};

module.exports = logService;