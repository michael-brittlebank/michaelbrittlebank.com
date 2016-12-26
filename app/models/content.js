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
                        id: utilService.getValueFromKey(entry,'id'),
                        title: utilService.getValueFromKey(entry,'title'),
                        body: utilService.getValueFromKey(entry,'content'),
                        url: utilService.getValueFromKey(entry,'slug'),
                        techStack: utilService.getValueFromKey(entry.custom_fields,'wpcf-portfolio-tech-stack'),
                        demoUrl: utilService.getValueFromKey(entry.custom_fields,'wpcf-portfolio-demo-url'),
                        repositoryUrl: utilService.getValueFromKey(entry.custom_fields,'wpcf-portfolio-repository-url'),
                        featuredIcon: utilService.getValueFromKey(entry.custom_fields,'wpcf-portfolio-featured-icon'),
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
                var data = JSON.parse(response);
                data = _.map(data.posts, function(entry){
                    return {
                        id: utilService.getValueFromKey(entry,'id'),
                        title: utilService.getValueFromKey(entry,'title'),
                        body: utilService.getValueFromKey(entry,'content'),
                        url: utilService.getValueFromKey(entry,'slug'),
                        excerpt: utilService.getValueFromKey(entry.custom_fields,'wpcf-music-excerpt')
                    }
                });
                return promise.resolve(data);
            } catch (error){
                return promise.reject(error);
            }
        });
};

content.getSeoObject = function(response) {
    //todo
    return response;
};

content.getMenuObject = function(response){
    return promise.resolve()
        .then(function(){
            try {
                var data = JSON.parse(response);
                data = _.map(data.menu, function(entry){
                    return {
                        id: utilService.getValueFromKey(entry,'id'),
                        title: utilService.getValueFromKey(entry,'label'),
                        url: utilService.getValueFromKey(entry,'url'),
                        menuOrder: utilService.getValueFromKey(entry,'menu_order'),
                        parentId: utilService.getValueFromKey(entry,'parent_id')
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
                        id: utilService.getValueFromKey(entry,'id'),
                        title: utilService.getValueFromKey(entry,'title'),
                        url: '/'+utilService.getValueFromKey(entry,'slug'),
                        image: utilService.simpleNullCheck(entry,'thumbnail_images')?utilService.getValueFromKey(entry.thumbnail_images.full,'url'):'',
                        icon: utilService.getValueFromKey(entry.custom_fields,'wpcf-homepage-block-icon')
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
                        id: utilService.getValueFromKey(entry,'id'),
                        title: utilService.getValueFromKey(entry,'title'),
                        url: utilService.simpleNullCheck(entry,'thumbnail_images')?utilService.getValueFromKey(entry.thumbnail_images.full,'url'):''
                    }
                });
                return promise.resolve(data);
            } catch (error){
                return promise.reject(error);
            }
        });
};

function getPageModel(data){
    //private method because it's not wrapped in try catch or promisified
    const pageUrl =  utilService.simpleNullCheck(data,'slug') && utilService.getValueFromKey(data,'slug').toLowerCase().indexOf('home')!==-1?'':utilService.getValueFromKey(data,'slug');//use blank url for homepage
    return {
        id: utilService.getValueFromKey(data,'id'),
        title: utilService.getValueFromKey(data,'title'),
        url: '/'+pageUrl
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
module.exports = content;