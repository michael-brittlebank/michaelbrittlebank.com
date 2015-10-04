
var resolvingConfig = function() {
    var conf;
    if (process.env.NODE_ENV) {
        conf = require('./env/'+process.env.NODE_ENV);
    } else {
        conf = require('./env/default');
    }
    return conf;
};

module.exports = resolvingConfig();