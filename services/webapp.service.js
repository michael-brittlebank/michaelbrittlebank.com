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
    noContent: 204,
    movedPermanently: 301,
    temporaryRedirect: 307,
    badRequest: 400,
    unauthorized: 401,
    forbidden: 403,
    notFound: 404,
    internalServerError: 500,
    serviceUnavailable: 503
};

webapp.months = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December'
];

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
            '===/i':	function(l,r) { return l.toLowerCase() === r.toLowerCase(); },
            '!==':	function(l,r) { return l !== r; },
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
    },
    isNotEmpty: function(data, options){
        if(data && data.length > 0) {
            return options.fn(this);
        } else {
            return options.inverse(this);
        }
    },
    isEvenNumber: function(data, options){
        if(parseInt(data)%2 === 0) {
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
    if (webapp.simpleNullCheck(data,'fields') && webapp.simpleNullCheck(data.fields,'file')){
        return data.fields.file.url+'?q=90&fl=progressive&w=1920';
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

webapp.getIndicesOf = function(searchStr, str, caseSensitive) {
    //http://stackoverflow.com/questions/3410464/how-to-find-all-occurrences-of-one-string-in-another-in-javascript
    var startIndex = 0, searchStrLen = searchStr.length;
    var index, indices = [];
    if (!caseSensitive) {
        str = str.toLowerCase();
        searchStr = searchStr.toLowerCase();
    }
    while ((index = str.indexOf(searchStr, startIndex)) > -1) {
        indices.push(index);
        startIndex = index + searchStrLen;
    }
    return indices;
};

webapp.htmlParser = function(data){
    var imageStartTag = '[img',
        imageEndTag = '/img]',
        imageOccurrences = webapp.getIndicesOf(imageStartTag, data, false),
        imageObject,
        className,
        replacementHtml;
    if (imageOccurrences.length > 0){
        for (var i = 0; i <imageOccurrences.length; i++){
            try {
                className = i%2===0?'left-float':'right-float';
                //need to reevaluate tag locations once replacement has happened
                imageObject = JSON.parse(data.substring(data.indexOf(imageStartTag)+imageStartTag.length,data.indexOf(imageEndTag)));
                replacementHtml = webapp.htmlEntityConversion('<img src="'+imageObject.src+
                    '" alt="'+imageObject.alt+
                    '" class="'+className+'"/>',true);
            }
            catch (e){
                console.log(e);
                replacementHtml = '';
            }
            data = data.replace(data.substring(data.indexOf(imageStartTag), data.indexOf(imageEndTag)+imageEndTag.length), replacementHtml);
        }
    }
    return marked(webapp.htmlEntityConversion(data, false));
};

webapp.getDefaultMetaTitle = function(title){
    return 'Mike Stumpf | '+title;
};

webapp.getMetaExcerpt = function(data){
    data = striptags(data);
    if (data.length > 160){
        data = data.substring(0, data.lastIndexOf(' ',160));
    }
    return data;
};

webapp.getPostExcerpt = function(data){
    data = striptags(data);
    if (data.length > 300){
        data = data.substring(0, data.lastIndexOf(' ',250));
    }
    return data;
};

webapp.filterDate = function(data){
    if (data && data.indexOf('-') !== -1){
        var dateArray = data.split('-');
        data = webapp.months[parseInt(dateArray[1])-1]+' '+dateArray[2]+', '+dateArray[0];
    }
    return data;
};

webapp.htmlEntityConversion = function(data, convertToHtmlEntity){
    var htmlEntity = [
            '&#47;'
        ],
        plainText = [
            '/'
        ],
        i;
    if (convertToHtmlEntity){
        for (i = 0; i < htmlEntity.length; i++){
            data = data.replace(new RegExp(plainText[i], 'g'),htmlEntity[i]);
        }
    } else {
        for (i = 0; i < htmlEntity.length; i++){
            data = data.replace(new RegExp(htmlEntity[i], 'g'),plainText[i]);
        }
    }
    return data;
};

webapp.getDefaultMetaImage = function(){
    return '/images/favicon-194x194.png';
};

webapp.getMenuHighlight = function(url){
    url = url.toLowerCase();
    if (url.indexOf('music') !== -1){
        return 'music';
    } else if (url.indexOf('travel') !== -1){
        return 'travel';
    } else if (url.indexOf('portfolio') !== -1) {
        return 'portfolio';
    } else if (url.indexOf('resume') !== -1) {
        return 'resume';
    } else {
        return '';
    }
};

webapp.simpleNullCheck = function(object,key){
    return object && object.hasOwnProperty(key) && object[key]?true:false;
};

webapp.getValueFromKey = function(object,key){
    return webapp.simpleNullCheck(object,key)?object[key]:'';
};

webapp.getHTMLValueFromKey = function(object,key){
    return webapp.simpleNullCheck(object,key)?webapp.htmlParser(object[key]):'';
};

webapp.getImageValueFromKey = function(object,key){
    return webapp.simpleNullCheck(object,key)?webapp.getImageUrl(object[key]):'';
};

webapp.getUrlValueFromKey = function(object,key){
    return webapp.simpleNullCheck(object,key)?webapp.filterUrl(object[key]):'';
};

webapp.getDateValueFromKey = function(object,key){
    return webapp.simpleNullCheck(object,key)?webapp.filterDate(object[key]):'';
};

module.exports = webapp;