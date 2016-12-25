const //packages
    promise = require('bluebird');

var session = {};

session.getHeaderMenu = function(req){
    return req.session.hasOwnProperty('headerMenu') ? req.session.headerMenu : {};
};

session.setHeaderMenu = function(req, data){
    return req.session.headerMenu = data;
};

module.exports = session;