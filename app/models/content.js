const //packages
    promise = require('bluebird'),
    _ = require('lodash');

var content = {};

content.getPortfolioItemObjects = function(response){
    return promise.resolve()
        .then(function(){
            try {
                var data = JSON.parse(response);
                data = _.map(data.posts, function(entry){
                    return {
                        id: entry.id,
                        title: entry.title,
                        body: entry.content,
                        url: entry.custom_fields['wpcf-portfolio-url'][0],
                        techStack: entry.custom_fields['wpcf-portfolio-tech-stack'][0],
                        repositoryUrl: entry.custom_fields['wpcf-portfolio-repository-url'][0],
                        portfolioGroup: entry['taxonomy_portfolio-group'][0].title
                    }
                });
                return promise.resolve(data);
            } catch (error){
                return promise.reject(error);
            }
        });
};

module.exports = content;