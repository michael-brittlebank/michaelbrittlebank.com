(function(){

    var that = app.views.portfolio.readingList,
        $ = jQuery,
        animations = app.animations,
        readingList,
        readingListContainer;

    function resizeContainer(){
        readingList.iFrameResize({
            bodyMargin: '0 0 50px 0',
            checkOrigin: [
                'http://wordpress.mikestumpf.com'
            ],
            initCallback: function(){
                animations.fadeIn(readingListContainer,{duration: 350});
            }
        });
    }

    this.init = function(){
        //variables
        readingList = $('#reading-list');
        readingListContainer = $('#reading-list-container');

        //functions
        resizeContainer();
    };

}).apply(app.views.portfolio.readingList);