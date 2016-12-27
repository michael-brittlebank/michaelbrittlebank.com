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
        error500:{},
        travel: {},
        portfolio: {},
        music: {},
        resume: {}
    },

    //functions
    init: function(){
        var carousel = app.carousel,
            views = app.views,
            animations = app.animations;

        //services
        app.handlebars.applyHelpers();

        //loading animation
        animations.fadeIn($('header'),1500,0,0);
        animations.fadeIn($('footer'),1500,1000,0);

        //modules
        if (carousel.hasCarousels()){
            carousel.init();
        }

        //errors
        views.error404.init();
        views.error500.init();

        //views
        // views.homepage.init();
        views.travel.init();
        views.resume.init();
        views.music.init();
    }
};

//wait for the dom to load
$(function(){
    app.init();
});