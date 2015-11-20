var /* packages */
    handlebars = require('handlebars'),
    logger = require('../lib/logger'),
    marked = require('marked'),
    webapp = {
        app: {
            environment: String(process.env.NODE_ENV),
            isLiveConfig: function(){
                return webapp.app.environment === "default";
            },
            isDevConfig: function(){
                return webapp.app.environment === "development";
            }
        }
    };

webapp.status = {
    ok: 200,
    created: 201,
    accepted: 202,
    no_content: 204,
    moved_permanently: 301,
    temporary_redirect: 307,
    bad_request: 400,
    unauthorized: 401,
    forbidden: 403,
    not_found: 404,
    internal_server_error: 500,
    service_unavailable: 503
};

webapp.hbsHelpers = {
    compare: function(lvalue, rvalue, options) {
        //https://gist.github.com/doginthehat/1890659
        if (arguments.length !== 3) {
            throw new Error("Handlebars Helper 'compare' needs 3 parameters");
        }
        var operator = options.hash.operator || "==";
        var operators = {
            '==':		function(l,r) { return l == r; },
            '===':	function(l,r) { return l === r; },
            '!=':		function(l,r) { return l != r; },
            '<':		function(l,r) { return l < r; },
            '>':		function(l,r) { return l > r; },
            '<=':		function(l,r) { return l <= r; },
            '>=':		function(l,r) { return l >= r; },
            'typeof':	function(l,r) { return typeof l == r; }
        };
        if (!operators[operator]) {
            throw new Error("Handlebars Helper 'compare' doesn't know the operator " + operator);
        }
        var result = operators[operator](lvalue,rvalue);
        if(result) {
            return options.fn(this);
        } else {
            return options.inverse(this);
        }
    }
};

/**
 * Helper Functions ----------------------------------------------------------
 */

webapp.getFirstResult = function(data){
    if (data && data.length > 0){
        return data[0];
    }
    else {
        return false;
    }
};

webapp.getImageUrl = function(data){
    if (webapp.simpleNullCheck(data,'fields')){
        return data.fields.file.url;
    }
    else {
        return '';
    }
};

webapp.simpleNullCheck = function(object,key){
    return object && object.hasOwnProperty(key) && object[key];
};

webapp.getValueFromKey = function(object,key){
    return webapp.simpleNullCheck(object,key)?object[key]:'';
};

webapp.getHTMLValueFromKey = function(object,key){
    return webapp.simpleNullCheck(object,key)?marked(object[key]):'';
};

webapp.getImageValueFromKey = function(object,key){
    return webapp.simpleNullCheck(object,key)?webapp.getImageUrl(object[key]):'';
};

module.exports = webapp;