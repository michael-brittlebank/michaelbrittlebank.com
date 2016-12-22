/*
 this follows the namespacing pattern listed here https://addyosmani.com/blog/essential-js-namespacing/
 */

var app = {

    //libraries
    ajax: {},
    animations: {},
    handlebars: {},
    helpers: {},
    mediaQueries: {},

    //modules
    carousel: {},

    //templates
    views: {
        homepage:{},
        error404:{},
        error500:{}
    },

    //functions
    init: function(){
        var carousel = app.carousel,
            views = app.views;

        //services
        app.handlebars.applyHelpers();


        //modules
        if (carousel.hasCarousels()){
            carousel.init();
        }

        //errors
        views.error404.init();
        // views.error500.init();

        //views
        views.homepage.init();
    }
};

//wait for the dom to load
$(function(){
    app.init();
});