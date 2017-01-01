(function(){

    var that = app.views.portfolio.page,
        $ = jQuery,
        mediaQueries = app.mediaQueries,
        quotes,
        carousels,
        currentTranslation = 0;

    function animateQuote(element){
        element
            .blast({delimiter: 'word'})
            .velocity('transition.fadeIn', {
                duration: 1000,
                stagger: 75,
                delay: 0,
                begin: function(){
                    element.css({display: 'block',opacity:'1'});
                },
                complete: function(){
                    element.velocity('transition.fadeOut', {
                        duration: 1000,
                        delay: 2000,
                        complete: function(){
                            currentTranslation++;
                            if (currentTranslation%quotes.length === 0){
                                currentTranslation = 0;
                            }
                            animateQuote($(quotes[currentTranslation]));
                        }
                    });
                }
            });
    }

    function setQuoteHeight(){
        quotes.each(function(){
            var that = $(this);
            that.css({height: that.height(), display: 'none', position: 'absolute'});
        });
    }

    function initializeCarousels(){
        carousels.slick({
            dots: true,
            infinite: true,
            slidesToShow: 2,
            slidesToScroll: 1,
            centerMode: true,
            variableWidth: false,
            responsive: [
                {
                    //mobile devices
                    breakpoint: mediaQueries.getTabletBreakpoint(),
                    settings: {
                        slidesToShow: 1
                    }
                }
            ]
        });
    }

    this.init = function(){
        if($('#page-portfolio').length > 0){
            //variables
            quotes = $('.portfolio-quote');
            carousels = $('.portfolio-carousel');

            //functions
            setQuoteHeight();
            animateQuote($(quotes[0]));
            initializeCarousels();
        }
    };

}).apply(app.views.portfolio.page);