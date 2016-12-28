(function(){

    var that = app.views.portfolio.readingList,
        $ = jQuery,
        animations = app.animations;

    this.init = function(){
        $('iframe').iFrameResize({
            bodyMargin: 25,
            checkOrigin: [
                'http://wordpress.mikestumpf.com'
            ],
            initCallback: function(){
                animations.animateElement($('#content-reading-list'),{
                    properties: {
                        opacity: 1
                    },
                    duration: 350
                });
            }
        });
    };

}).apply(app.views.portfolio.readingList);