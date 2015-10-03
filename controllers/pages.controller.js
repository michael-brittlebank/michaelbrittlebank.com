var zero = require('../services/zero'),
    pages = {};

pages.default500Page = function(req, res, next){
    res.locals.meta = {
        title: '500',
        description: '500 meta description'
    };
    res.locals.page = {
        title: 'this is the 500 page',
        body: 'errors!'
    };
    return res.render('500');
};

pages.default404Page = function(req, res, next){
    res.locals.meta = {
        title: '404',
        description: '404 meta description'
    };
    res.locals.page = {
        title: 'Oops, 404',
        body: 'There seems that there was an error.  Please try again later'
    };
    return res.render('404');
};

pages.getIndex = function(req, res, next) {
    res.locals.page = {
        title: 'homepage',
        body: 'homepage body'
    };
    return res.render('index');
};

module.exports = pages;