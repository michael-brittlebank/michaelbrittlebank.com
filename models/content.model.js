var webapp = require('../services/webapp.service'),
    logger = require('../services/logger.service'),
    contentModels = {};

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
            linkTitle: webapp.getValueFromKey(fields, 'linkTitle'),
            url: webapp.getUrlValueFromKey(fields,'url'),
            content: webapp.simpleNullCheck(fields,'children')?contentService.contentBlockDigest(fields.children):{},
            layout: webapp.getValueFromKey(fields,'layout'),
            categories: webapp.simpleNullCheck(fields,'categories')?fields.categories.join(', '):{},
            tags: webapp.simpleNullCheck(fields,'tags')?fields.tags.join(', '):{},
            publishedTime: createdAt.substring(0,createdAt.lastIndexOf('.'))+'-4:00',//GMT
            modifiedTime: modifiedAt.substring(0,modifiedAt.lastIndexOf('.'))+'-4:00',
            metaTitle: webapp.simpleNullCheck(fields,'metaTitle')?webapp.getValueFromKey(fields,'metaTitle'):webapp.getDefaultMetaTitle(webapp.getValueFromKey(fields,'title')),
            metaDescription: webapp.simpleNullCheck(fields,'metaDescription')?webapp.getValueFromKey(fields,'metaDescription'):webapp.getMetaExcerpt(webapp.getHTMLValueFromKey(fields,'body')),
            metaImage: webapp.simpleNullCheck(fields,'metaImage')?webapp.getImageUrl(fields.metaImage):''//todo, default meta image
        };
    }
    else {
        return {};
    }
};

contentModels.getPortfolioModel = function(data){
    if (webapp.simpleNullCheck(data,'fields')){
        var fields = data.fields,
            createdAt = JSON.stringify(data.sys.createdAt),
            modifiedAt = JSON.stringify(data.sys.updatedAt);
        return {
            id: data.sys.id,
            title: webapp.getValueFromKey(fields,'title'),
            linkTitle: webapp.getValueFromKey(fields, 'linkTitle'),
            url: webapp.getUrlValueFromKey(fields,'url'),
            body: webapp.getHTMLValueFromKey(fields,'body'),
            excerpt: webapp.getHTMLValueFromKey(fields,'excerpt'),
            techStack: webapp.getValueFromKey(fields,'techStack'),
            featuredIcon: webapp.getValueFromKey(fields, 'featuredIcon'),
            repoUrl: webapp.getValueFromKey(fields, 'repoUrl'),
            demoUrl: webapp.getValueFromKey(fields, 'demoUrl'),
            layout: webapp.getValueFromKey(fields,'layout'),
            portfolioGroup: webapp.getValueFromKey(fields,'portfolioGroup'),
            publishedTime: createdAt.substring(0,createdAt.lastIndexOf('.'))+'-4:00',//GMT
            modifiedTime: modifiedAt.substring(0,modifiedAt.lastIndexOf('.'))+'-4:00',
            metaTitle: webapp.simpleNullCheck(fields,'metaTitle')?webapp.getValueFromKey(fields,'metaTitle'):webapp.getDefaultMetaTitle(webapp.getValueFromKey(fields,'title')),
            metaDescription: webapp.simpleNullCheck(fields,'metaDescription')?webapp.getValueFromKey(fields,'metaDescription'):webapp.getMetaExcerpt(webapp.getHTMLValueFromKey(fields,'body')),
            metaImage: webapp.simpleNullCheck(fields,'metaImage')?webapp.getImageUrl(fields.metaImage):''//todo, default meta image
        };
    }
    else {
        return {};
    }
};

contentModels.getContentBlockModel = function(data){
    if (webapp.simpleNullCheck(data,'fields')){
        var fields = data.fields,
            linkTitle,
            linkUrl;
        if (webapp.simpleNullCheck(fields,'internalLink')){
            var internalLink = webapp.getValueFromKey(fields,'internalLink');
            linkTitle = webapp.getValueFromKey(internalLink.fields,'linkTitle');
            linkUrl = webapp.getUrlValueFromKey(internalLink.fields,'url');
        }
        else {
            linkTitle = webapp.getValueFromKey(fields,'externalLinkUrl');
            linkUrl = webapp.getValueFromKey(fields,'externalLinkTitle');
        }
        return {
            id: data.sys.id,
            title: webapp.getValueFromKey(fields,'title'),
            body: webapp.getHTMLValueFromKey(fields,'body'),
            linkTitle: linkTitle,
            linkUrl: linkUrl,
            image: webapp.simpleNullCheck(fields,'featuredImage')?webapp.getImageUrl(fields.featuredImage):''
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

contentModels.getQuoteModel = function(data){
    if (webapp.simpleNullCheck(data,'fields')){
        var fields = data.fields;
        return {
            id: data.sys.id,
            author: webapp.getValueFromKey(fields,'author'),
            source: webapp.getValueFromKey(fields,'source'),
            body: webapp.getHTMLValueFromKey(fields,'body')
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

contentModels.getAlbumModel = function(data){
    if (webapp.simpleNullCheck(data,'fields')){
        var fields = data.fields,
            contentService = require('../services/content.service');
        return {
            id: data.sys.id,
            title: webapp.getValueFromKey(fields,'title'),
            images: webapp.simpleNullCheck(fields,'images')?contentService.imageDigest(fields.images):{}
        };
    }
    else {
        return {};
    }
};

contentModels.getImageModel = function(data){
    if (webapp.simpleNullCheck(data,'fields')){
        var fields = data.fields;
        return {
            id: data.sys.id,
            title: webapp.getValueFromKey(fields,'title'),
            url: webapp.getImageUrl(data)
        };
    }
    else {
        return {};
    }
};

contentModels.getPostModel = function(data){
   if (webapp.simpleNullCheck(data,'fields')){
        var fields = data.fields;
        return {
            id: data.sys.id,
            title: webapp.getValueFromKey(fields,'title'),
            url: webapp.getValueFromKey(fields, 'url'),
            body: webapp.getHTMLValueFromKey(fields,'body'),
            excerpt: webapp.simpleNullCheck(fields,'excerpt')?webapp.getHTMLValueFromKey(fields,'excerpt'):webapp.getPostExcerpt(webapp.getHTMLValueFromKey(fields,'body')),
            postDate: webapp.getValueFromKey(fields,'postDate')
        };
    }
    else {
        return {};
    }
};

module.exports = contentModels;