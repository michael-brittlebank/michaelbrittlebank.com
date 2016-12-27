(function(){

    var that = app.views.music,
        $ = jQuery,
        animations = app.animations,
        posts;

    function fadeInTiles(){
        var animationIndex = 0,
            animationInterval = setInterval(function(){
                if (animationIndex === posts.length){
                    clearInterval(animationInterval);
                } else {
                    animations.animateElement(posts[animationIndex],{
                        properties: {
                            opacity: 1
                        },
                        duration: 350
                    });
                    animationIndex++;
                }
            }, 100);
    }

    this.init = function(){
        if($('#page-music').length > 0){
            //variables
            posts = $('.music-post-container');

            //functions
            fadeInTiles();
        }
    };

}).apply(app.views.music);