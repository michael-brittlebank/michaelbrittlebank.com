/*
 this follows the namespacing pattern listed here https://addyosmani.com/blog/essential-js-namespacing/
 */

var app = {

    //libraries (highest level for ease of use)
    ajax: {},
    animations: {},
    handlebars: {},
    helpers: {},
    mediaQueries: {},

    //services
    services: {
        data: {}
    },

    //templates
    views: {
        homepage:{},
        error404:{},
        error500:{},
        travel: {},
        portfolio: {
            readingList: {},
            bubbles: {},
            chorus: {},
            page: {}
        },
        music: {
            page: {},
            post: {}
        },
        resume: {}
    },

    //functions
    init: function(){
        var views = app.views;

        //services
        app.handlebars.applyHelpers();

        //errors
        views.error404.init();
        views.error500.init();

        //views
        views.homepage.init();
        views.travel.init();
        views.resume.init();

        //portfolio
        views.portfolio.page.init();
        views.portfolio.readingList.init();
        views.portfolio.bubbles.init();
        views.portfolio.chorus.init();

        //music
        views.music.page.init();
        views.music.post.init();
    }
};

//wait for the dom to load
$(function(){
    app.init();
});