var webapp = require('../services/webapp.service'),
    logger = require('../lib/logger'),
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
            content: webapp.simpleNullCheck(fields,'children')?contentService.contentBlockDigest(fields.children):{},
            categories: webapp.simpleNullCheck(fields,'categories')?fields.categories.join(', '):{},
            tags: webapp.simpleNullCheck(fields,'tags')?fields.tags.join(', '):{},
            publishedTime: createdAt.substring(0,createdAt.lastIndexOf('.'))+'-4:00',//GMT
            modifiedTime: modifiedAt.substring(0,modifiedAt.lastIndexOf('.'))+'-4:00',
            metaTitle: webapp.getValueFromKey(fields,'metaTitle'),//todo, default meta title
            metaDescription: webapp.getValueFromKey(fields,'metaDescription'),//todo, default meta description
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

module.exports = contentModels;