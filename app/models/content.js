const //packages
    promise = require('bluebird'),
    _ = require('lodash'),
//services
    utilService = require('../services/util');

var content = {};

content.getPortfolioItemObjects = function(response){
    return promise.resolve()
        .then(function(){
            try {
                var data = JSON.parse(response);
                data = _.map(data.posts, function(entry){
                    return {
                        id: utilService.getValueByKey(entry,'id'),
                        title: utilService.getValueByKey(entry,'title'),
                        body: utilService.getValueByKey(entry,'content'),
                        slug: utilService.getValueByKey(entry,'slug'),
                        url: utilService.getFirstValueByKey(entry.custom_fields,'wpcf-portfolio-demo-url'),
                        techStack: utilService.getFirstValueByKey(entry.custom_fields,'wpcf-portfolio-tech-stack'),
                        repositoryUrl: utilService.getFirstValueByKey(entry.custom_fields,'wpcf-portfolio-repository-url'),
                        featuredIcon: utilService.getFirstValueByKey(entry.custom_fields,'wpcf-portfolio-featured-icon'),
                        portfolioGroup: utilService.simpleNullCheck(entry, 'taxonomy_portfolio-group')? entry['taxonomy_portfolio-group'][0].title:''
                    }
                });
                return promise.resolve(data);
            } catch (error){
                return promise.reject(error);
            }
        });
};

content.getMusicPostObjects = function(response){
    return promise.resolve()
        .then(function(){
            try {
                const urlPrefix = '/music';
                var data = JSON.parse(response);
                data = _.map(data.posts, function(entry){
                    return {
                        id: utilService.getValueByKey(entry,'id'),
                        title: utilService.getValueByKey(entry,'title'),
                        body: utilService.getValueByKey(entry,'content'),
                        url: urlPrefix+'/'+utilService.getValueByKey(entry,'slug'),
                        publishedDate: utilService.getValueByKey(data,'date'),
                        excerpt: utilService.getFirstValueByKey(entry.custom_fields,'wpcf-music-excerpt'),
                        metaTitle: utilService.getFirstValueByKey(entry.custom_fields,'wpcf-meta-title'),
                        metaDescription: utilService.getFirstValueByKey(entry.custom_fields,'wpcf-meta-description')
                    }
                });
                return promise.resolve(data);
            } catch (error){
                return promise.reject(error);
            }
        });
};

content.getMenuObject = function(response){
    return promise.resolve()
        .then(function(){
            try {
                var data = JSON.parse(response);
                data = _.map(data.menu, function(entry){
                    return {
                        id: utilService.getValueByKey(entry,'id'),
                        title: utilService.getValueByKey(entry,'label'),
                        url: utilService.getValueByKey(entry,'url'),
                        menuOrder: utilService.getValueByKey(entry,'menu_order'),
                        parentId: utilService.getValueByKey(entry,'parent_id')
                    }
                });
                //sort by menu order
                data = _.sortBy(data, 'menuOrder');
                return promise.resolve(data);
            } catch (error){
                return promise.reject(error);
            }
        });
};

content.getHomepageBlockObjects = function(response){
    return promise.resolve()
        .then(function(){
            try {
                var data = JSON.parse(response);
                data = _.map(data.posts, function(entry){
                    return {
                        //assume api sorting by menu order
                        id: utilService.getValueByKey(entry,'id'),
                        title: utilService.getValueByKey(entry,'title'),
                        url: '/'+utilService.getValueByKey(entry,'slug'),
                        image: utilService.getImageUrl(entry),
                        icon: utilService.getFirstValueByKey(entry.custom_fields,'wpcf-homepage-block-icon')
                    }
                });
                return promise.resolve(data);
            } catch (error){
                return promise.reject(error);
            }
        });
};

content.getTravelImageObjects = function(response){
    return promise.resolve()
        .then(function(){
            try {
                var data = JSON.parse(response);
                data = _.map(data.posts, function(entry){
                    return {
                        //assume api sorting by menu order
                        id: utilService.getValueByKey(entry,'id'),
                        title: utilService.getValueByKey(entry,'title'),
                        url: utilService.getImageUrl(entry)
                    }
                });
                return promise.resolve(data);
            } catch (error){
                return promise.reject(error);
            }
        });
};

function getPageModel(data){
    //todo, missing seo fields
    //private method because it's not wrapped in try catch or promisified
    const pageTitle = utilService.getValueByKey(data,'title'),
    //use blank url for homepage
        pageUrl =  utilService.simpleNullCheck(data,'slug') && utilService.getValueByKey(data,'slug').toLowerCase().indexOf('home')!==-1?'':utilService.getValueByKey(data,'slug'),
        metaTitle = utilService.simpleNullCheck(data.custom_fields,'wpcf-meta-title')?utilService.getFirstValueByKey(data.custom_fields,'wpcf-meta-title'):utilService.metaTitlePrefix+pageTitle;
    return {
        id: utilService.getValueByKey(data,'id'),
        title: pageTitle,
        url: '/'+pageUrl,
        publishedDate: utilService.getValueByKey(data,'date'),
        metaTitle: metaTitle,
        metaDescription: utilService.getFirstValueByKey(data.custom_fields,'wpcf-meta-description'),
        metaImage: '',
        metaCategories: '',
        metaTags: ''
    }
}

content.getPageObject = function(response){
    //single page
    return promise.resolve()
        .then(function(){
            try {
                var data = JSON.parse(response);
                data = getPageModel(data);
                return promise.resolve(data);
            } catch (error){
                return promise.reject(error);
            }
        });
};

content.getPageObjects = function(response){
    //multiple pages
    return promise.resolve()
        .then(function(){
            try {
                var data = JSON.parse(response);
                data = _.map(data.posts, function(entry){
                    return getPageModel(entry);
                });
                return promise.resolve(data);
            } catch (error){
                return promise.reject(error);
            }
        });
};

content.getQuoteObjects = function(response){
    return promise.resolve()
        .then(function(){
            try {
                var data = JSON.parse(response);
                data = _.map(data.posts, function(entry){
                    return {
                        //assume api sorting by menu order
                        id: utilService.getValueByKey(entry,'id'),
                        body: utilService.getValueByKey(entry,'content'),
                        author: utilService.getFirstValueByKey(entry.custom_fields,'wpcf-quote-author')
                    }
                });
                return promise.resolve(data);
            } catch (error){
                return promise.reject(error);
            }
        });
};

module.exports = content;