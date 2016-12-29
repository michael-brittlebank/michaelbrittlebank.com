(function(){

    var that = app.views.portfolio.readingList,
        $ = jQuery,
        animations = app.animations;

    this.init = function(){
        $('iframe').iFrameResize({
            bodyMargin: 0,
            checkOrigin: [
                'http://wordpress.mikestumpf.com'
            ],
            initCallback: function(){
                animations.fadeIn($('#reading-list-container'),{duration: 350});
            }
        });
    };

}).apply(app.views.portfolio.readingList);