var /* packages */
    handlebars = require('handlebars'),
    logger = require('./logger.service'),
    config = require('../config/config'),
    marked = require('marked'),
    striptags = require('striptags'),
    webapp = {
        app: {
            environment: String(process.env.NODE_ENV),
            isLiveConfig: function(){
                return webapp.app.environment === 'default';
            },
            isDevConfig: function(){
                return webapp.app.environment === 'development';
            },
            isLocalConfig: function(){
                return webapp.app.environment === 'local';
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
            throw new Error('Handlebars Helper "compare" needs 3 parameters');
        }
        var operator = options.hash.operator || '==';
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
            throw new Error('Handlebars Helper "compare" doesn\'t know the operator ' + operator);
        }
        var result = operators[operator](lvalue,rvalue);
        if(result) {
            return options.fn(this);
        } else {
            return options.inverse(this);
        }
    },
    eachReverse: function(context) {
        var options = arguments[arguments.length - 1],
            result = '';
        if (context && context.length > 0) {
            for (var i = context.length - 1; i >= 0; i--) {
                result += options.fn(context[i]);
            }
        } else {
            result = options.inverse(this);
        }
        return result;
    },
    addition: function(value,add){
        return parseInt(value)+parseInt(add);
    },
    gridOrder: function(index, size) {
        index = parseInt(index)+1;
        if (index % 4 === 0 || index % 4 === 3){
            //skip the first two blocks in a group
            if (index % 2 === 0){
                return size+'-order-'+(index-1);
            } else {
                return size+'-order-'+(index+1);
            }
        }
        else {
            return size+'-order-'+index;
        }
    }
};

/**
 * Helper Functions ----------------------------------------------------------
 */

webapp.getFirstResult = function(data){
    if (data){
        if (data.length > 0){
            return data[0];
        }
        else {
            return data;
        }
    }
    else {
        return false;
    }
};

webapp.getImageUrl = function(data){
    data = webapp.getFirstResult(data);
    if (webapp.simpleNullCheck(data,'fields')){
        return data.fields.file.url;
    }
    else {
        return '';
    }
};

webapp.filterUrl = function(data){
    if (data){
        if (data === 'index'){
            data = '/';
        }
        else {
            //test http/https, mailto:, and urls already starting with '/'
            if (!/^((http|https):\/\/)/.test(data) && !/^(mailto:)/.test(data) &&
                data.indexOf('/') !== 0) {
                data = '/' + data;
            }
        }
    }
    return data;
};

webapp.getDefaultMetaTitle = function(title){
    return 'Mike Stumpf | '+title;
};

webapp.getExcerpt = function(data){
    data = striptags(data);
    if (data.length > 160){
        data = data.substring(0, data.lastIndexOf(' ',160));
    }
    return data;
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

webapp.getUrlValueFromKey = function(object,key){
    return webapp.simpleNullCheck(object,key)?webapp.filterUrl(object[key]):'';
};

module.exports = webapp;