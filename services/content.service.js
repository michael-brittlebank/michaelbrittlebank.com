var /* models */
    contentModel = require('../models/content.model'),
/* services */
    webapp = require('./webapp.service'),
    logger = require('../services/logger.service'),
    contentService = {};

contentService.pageDigest = function (data) {
    if (data.length){
        data = webapp.getFirstResult(data);
    }
    if (data){
        return contentModel.getPageModel(data);
    }
    else {
        return {};
    }
};

contentService.portfolioDigest = function(data){
    if (data.length){
        data = webapp.getFirstResult(data);
    }
    if (data){
        return contentModel.getPortfolioModel(data);
    }
    else {
        return {};
    }
};

contentService.quoteDigest = function(data){
    if (data.length){
        data = webapp.getFirstResult(data);
    }
    if (data){
        return contentModel.getQuoteModel(data);
    }
    else {
        return {};
    }
};

contentService.contentBlockDigest = function(data){
    var result = {},
        i = 1;
    if(data) {
        data.forEach(function (entry) {
            result['block' + i] = contentModel.getContentBlockModel(entry);
            i++;
        });
    }
    return result;
};

contentService.menuDigest = function(data){
    var result = {},
        model;
    if(data) {
        data.forEach(function (entry) {
            model = contentModel.getMenuModel(entry);
            result[model.menuLocation] = model;
        });
    }
    return result;
};

contentService.menuItemDigest = function(data){
    var result = [];
    if(data) {
        data.forEach(function (entry) {
            result.push(contentModel.getMenuItemModel(entry));
        });
    }
    return result;
};

contentService.albumDigest = function(data){
    if (data.length){
        data = webapp.getFirstResult(data);
    }
    if (data){
        return contentModel.getAlbumModel(data);
    }
    else {
        return {};
    }
};

contentService.imageDigest = function(data){
    var result = [];
    if(data) {
        data.forEach(function (entry) {
            result.push(contentModel.getImageModel(entry));
        });
    }
    return result;
};

contentService.postsDigest = function(data){
    var result = {},
        i = 1;
    if(data) {
        data.forEach(function (entry) {
            result['post' + i] = contentModel.getPostModel(entry);
            i++;
        });
    }
    return result;
};

module.exports = contentService;