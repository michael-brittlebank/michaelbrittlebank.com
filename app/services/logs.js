const //packages
    utilService = require('./util');

var logService = {};

logService.error = function(error){
    if(utilService.isLocalConfig()){
        console.log('----------- ERROR -----------\n',error,'\n\n');
    }
};

logService.info = function(info){
    if(utilService.isLocalConfig()){
        console.log('----------- INFO -----------\n',info,'\n\n');
    }
};

module.exports = logService;