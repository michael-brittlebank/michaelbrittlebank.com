(function(){

    var that = app.views.music.post,
        $ = jQuery,
        animations = app.animations;

    this.init = function(){
        if($('#post-music').length > 0){

            //slider init
            $('#music-post-images').slick({
                infinite: true,
                slidesToShow: 1,
                slidesToScroll: 1,
                centerMode: true,
                fade: true,
                adaptiveHeight: true,
                cssEase: 'linear',
                speed: 500,
                dots: true
            });
            animations.fadeIn($('#music-post-images-container'),{duration: 500});
        }
    };

}).apply(app.views.music.post);