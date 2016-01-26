var portfolio = {};

portfolio.init = function(){
    //loading animation
    site.animation.fadeIn('#container-quote',1000,500,0);
    site.animation.fadeIn('.slider-header',1000,750,0);
    site.animation.fadeIn('.slider-container',1500,1000,0);
    //carousel init
    $('.portfolio-carousel').slick({
        dots: true,
        infinite: true,
        speed: 300,
        slidesToShow: 4,
        slidesToScroll: 1,
        centerMode: true,
        variableWidth: false,
        responsive: [
            {
                breakpoint: 1500,
                settings: {
                    centerMode: true,
                    slidesToShow: 2,//todo, make 4
                    slidesToScroll: 1
                }
            },
            {
                breakpoint: 1200,
                settings: {
                    centerMode: true,
                    slidesToShow: 2,//todo, change to 3
                    slidesToScroll: 1
                }
            },
            {
                breakpoint: 900,
                settings: {
                    centerMode: true,
                    slidesToShow: 2,
                    slidesToScroll: 1
                }
            },
            {
                breakpoint: 600,
                settings: {
                    centerMode: false,
                    slidesToShow: 1,
                    slidesToScroll: 1
                }
            }
        ]
    });
};