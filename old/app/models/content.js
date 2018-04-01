const //packages
    promise = require('bluebird'),
    _ = require('lodash'),
    moment = require('moment'),
//services
    utilService = require('../services/util');

var content = {};

content.getPortfolioItemObjects = function(response){
    return promise.resolve()
        .then(function(){
            try {
                var data = JSON.parse(response);
                data = _.map(data.posts, function(entry){
                    const pageTitle = utilService.getValueByKey(entry,'title'),
                        metaTitle = utilService.simpleNullCheck(entry.custom_fields,'wpcf-meta-title')?utilService.getFirstValueByKey(entry.custom_fields,'wpcf-meta-title'):utilService.metaTitlePrefix+pageTitle;
                    return {
                        id: utilService.getValueByKey(entry,'id'),
                        title: pageTitle,
                        body: utilService.getValueByKey(entry,'content'),
                        slug: utilService.getValueByKey(entry,'slug'),
                        url: utilService.getFirstValueByKey(entry.custom_fields,'wpcf-portfolio-demo-url'),
                        techStack: utilService.getFirstValueByKey(entry.custom_fields,'wpcf-portfolio-tech-stack'),
                        repositoryUrl: utilService.getFirstValueByKey(entry.custom_fields,'wpcf-portfolio-repository-url'),
                        icon: utilService.getFirstValueByKey(entry.custom_fields,'wpcf-portfolio-icon'),
                        portfolioGroup: utilService.simpleNullCheck(entry, 'taxonomy_portfolio-group')? entry['taxonomy_portfolio-group'][0].title:'',
                        // meta
                        metaDatePublished: utilService.getValueByKey(entry,'date'),//don't format
                        metaDateModified: utilService.getValueByKey(entry,'modified'),
                        metaTitle: metaTitle,
                        metaDescription: utilService.getFirstValueByKey(entry.custom_fields,'wpcf-meta-description'),
                        metaImage: '',
                        metaCategories: '',
                        metaTags: ''
                    };
                });
                //sort alphabetically
                data = _.sortBy(data,'title');
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
                    const pageTitle = utilService.getValueByKey(entry,'title'),
                        metaTitle = utilService.simpleNullCheck(entry.custom_fields,'wpcf-meta-title')?utilService.getFirstValueByKey(entry.custom_fields,'wpcf-meta-title'):utilService.metaTitlePrefix+pageTitle,
                        excerpt = utilService.getFirstValueByKey(entry.custom_fields,'wpcf-music-excerpt'),
                        metaDescription = utilService.simpleNullCheck(entry.custom_fields,'wpcf-meta-description')?utilService.getFirstValueByKey(entry.custom_fields,'wpcf-meta-description'):excerpt;
                    return {
                        id: utilService.getValueByKey(entry,'id'),
                        title: pageTitle,
                        body: utilService.getValueByKey(entry,'content'),
                        url: urlPrefix+'/'+utilService.getValueByKey(entry,'slug'),
                        datePublished: moment(utilService.getValueByKey(entry,'date')).format('MMMM Do YYYY'),
                        excerpt: excerpt,
                        images: utilService.getValueByKey(entry.custom_fields,'wpcf-music-images'),
                        metaTitle: metaTitle,
                        metaDescription: metaDescription,
                        metaDatePublished: utilService.getValueByKey(entry,'date'),//don't format
                        metaDateModified: utilService.getValueByKey(entry,'modified'),
                        metaImage: '',
                        metaCategories: '',
                        metaTags: ''
                    };
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
                var data = JSON.parse(response),
                    menuItems,
                    parentObjects,
                    topLevelMenuObject;
                menuItems = _.map(data.menu, function(entry){
                    return {
                        id: utilService.getValueByKey(entry,'id'),
                        title: utilService.getValueByKey(entry,'label'),
                        url: utilService.getValueByKey(entry,'url'),
                        menuOrder: utilService.getValueByKey(entry,'menu_order'),
                        parentId: utilService.getValueByKey(entry,'parent_id'),
                        children: []
                    };
                });
                //sort by menu order
                menuItems = _.sortBy(menuItems, 'menuOrder');
                //get parents
                parentObjects = _.remove(menuItems,{parentId: '0'});//mutates original array to leave children
                //assign children to parents
                _.each(menuItems, function(entry){
                    topLevelMenuObject = _.filter(parentObjects,{id:parseInt(entry.parentId)});
                    topLevelMenuObject[0].children.push(entry);
                });
                return promise.resolve(parentObjects);
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
                        id: utilService.getValueByKey(entry,'id'),
                        title: utilService.getValueByKey(entry,'title'),
                        url: '/'+utilService.getValueByKey(entry,'slug'),
                        menuOrder: utilService.getValueByKey(entry,'menu_order'),
                        image: utilService.getImageUrl(entry),
                        icon: utilService.getFirstValueByKey(entry.custom_fields,'wpcf-homepage-block-icon')
                    };
                });
                //sort by menu order
                data = _.sortBy(data, 'menuOrder');
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
                    };
                });
                return promise.resolve(data);
            } catch (error){
                return promise.reject(error);
            }
        });
};

function getPageModel(data){
    //private method because it's not wrapped in try catch or promisified
    const pageTitle = utilService.getValueByKey(data,'title'),
    //use blank url for homepage
        pageUrl =  utilService.simpleNullCheck(data,'slug') && utilService.getValueByKey(data,'slug').toLowerCase().indexOf('home')!==-1?'':utilService.getValueByKey(data,'slug'),
        metaTitle = utilService.simpleNullCheck(data.custom_fields,'wpcf-meta-title')?utilService.getFirstValueByKey(data.custom_fields,'wpcf-meta-title'):utilService.metaTitlePrefix+pageTitle;
    return {
        id: utilService.getValueByKey(data,'id'),
        title: pageTitle,
        body: utilService.getValueByKey(data,'content'),
        url: '/'+pageUrl,
        // meta
        metaTitle: metaTitle,
        metaDescription: utilService.getFirstValueByKey(data.custom_fields,'wpcf-meta-description'),
        metaDatePublished: utilService.getValueByKey(data,'date'),//don't format
        metaDateModified: utilService.getValueByKey(data,'modified'),
        metaImage: '',
        metaCategories: '',
        metaTags: ''
    };
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
                        author: utilService.getFirstValueByKey(entry.custom_fields,'wpcf-quote-author'),
                        source: utilService.getFirstValueByKey(entry.custom_fields,'wpcf-quote-source')
                    };
                });
                return promise.resolve(data);
            } catch (error){
                return promise.reject(error);
            }
        });
};

module.exports = content;