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

    //modules
    modules: {
        carousel: {}
    },

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

        //modules
        app.modules.carousel.init();

        //errors
        views.error404.init();
        views.error500.init();

        //views
        views.homepage.init();
        views.travel.init();
        views.resume.init();
        views.music.page.init();
        views.portfolio.page.init();

        //portfolio
        views.portfolio.readingList.init();
        views.portfolio.bubbles.init();
        views.portfolio.chorus.init();
    }
};

//wait for the dom to load
$(function(){
    app.init();
});