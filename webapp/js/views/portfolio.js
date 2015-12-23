var portfolio = {};

portfolio.init = function(){
    //loading animation
    $('#container-quote').velocity('transition.fadeIn',{duration:1000, delay:500});
    $('.slider-header').velocity('transition.fadeIn',{duration:1000, delay:750});
    $('.slider-container').velocity('transition.fadeIn',{duration:1500, delay:1000});
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
                    slidesToShow: 4,
                    slidesToScroll: 1
                }
            },
            {
                breakpoint: 1200,
                settings: {
                    centerMode: true,
                    slidesToShow: 3,
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