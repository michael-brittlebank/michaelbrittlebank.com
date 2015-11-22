var webapp = require('../services/webapp.service'),
    logger = require('../services/logger.service'),
    contentModels = {};

//since content is coming from contentful api instead of from db, departing from traditional model structure
contentModels.getPageModel = function(data){
    if (webapp.simpleNullCheck(data,'fields')){
        var fields = data.fields,
            contentService = require('../services/content.service'),
            createdAt = JSON.stringify(data.sys.createdAt),
            modifiedAt = JSON.stringify(data.sys.updatedAt);
        return {
            id: data.sys.id,
            title: webapp.getValueFromKey(fields,'title'),
            body: webapp.getHTMLValueFromKey(fields,'body'),
            linkTitle: webapp.simpleNullCheck(fields, 'linkTitle'),
            url: webapp.getUrlValueFromKey(fields,'url'),
            content: webapp.simpleNullCheck(fields,'children')?contentService.contentBlockDigest(fields.children):{},
            layout: webapp.getValueFromKey(fields,'layout'),
            categories: webapp.simpleNullCheck(fields,'categories')?fields.categories.join(', '):{},
            tags: webapp.simpleNullCheck(fields,'tags')?fields.tags.join(', '):{},
            publishedTime: createdAt.substring(0,createdAt.lastIndexOf('.'))+'-4:00',//GMT
            modifiedTime: modifiedAt.substring(0,modifiedAt.lastIndexOf('.'))+'-4:00',
            metaTitle: webapp.simpleNullCheck(fields,'metaTitle')?webapp.getValueFromKey(fields,'metaTitle'):webapp.getDefaultMetaTitle(webapp.getValueFromKey(fields,'title')),
            metaDescription: webapp.simpleNullCheck(fields,'metaDescription')?webapp.getValueFromKey(fields,'metaDescription'):webapp.getExcerpt(webapp.getHTMLValueFromKey(fields,'body')),
            metaImage: webapp.simpleNullCheck(fields,'metaImage')?webapp.getImageUrl(fields.metaImage):''//todo, default meta image
        };
    }
    else {
        return {};
    }
};

contentModels.getContentBlockModel = function(data){
    if (webapp.simpleNullCheck(data,'fields')){
        var fields = data.fields;
        return {
            id: data.sys.id,
            title: webapp.getValueFromKey(fields,'title'),
            body: webapp.getHTMLValueFromKey(fields,'body')
        };
    }
    else {
        return {};
    }
};

contentModels.getMenuModel = function(data){
    if (webapp.simpleNullCheck(data,'fields')){
        var fields = data.fields,
            contentService = require('../services/content.service');
        return {
            id: data.sys.id,
            menuLocation: webapp.getValueFromKey(fields,'menuLocation').toLowerCase(),
            children: webapp.simpleNullCheck(fields,'children')?contentService.menuItemDigest(fields.children):[]
        };
    }
    else {
        return {};
    }
};

contentModels.getMenuItemModel = function(data){
    if (webapp.simpleNullCheck(data,'fields')){
        var fields = data.fields;
        return {
            id: data.sys.id,
            title: webapp.simpleNullCheck(fields, 'linkTitle')?webapp.getValueFromKey(fields,'linkTitle'):webapp.getValueFromKey(fields,'title'),
            url: webapp.getUrlValueFromKey(fields,'url')
        };
    }
    else {
        return {};
    }
};

module.exports = contentModels;