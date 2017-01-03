(function(){

    var $ = jQuery,
        that = app.modules.carousel,
        carousels = $('.l--slick-carousel');

    this.hasCarousels = function(){
        return carousels.length > 0;
    };

    this.init = function() {
        if (that.hasCarousels) {
            carousels.slick({
                slidesToShow: 2,
                slidesToScroll: 1,
                dots: true,
                arrows: false,
                infinite: true
            });
        }
    };

}).apply(app.modules.carousel);