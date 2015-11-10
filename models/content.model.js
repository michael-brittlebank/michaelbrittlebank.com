var marked = require('marked'),
    contentModels = {};

//since content is coming from contentful api instead of from db, departing from traditional model structure
contentModels.getPageModel = function(data){
    return {
        title: '',
        body: marked('')
    };
};

module.exports = contentModels;