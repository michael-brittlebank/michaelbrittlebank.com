(function(){

    var that = app.views.error404,
        $ = jQuery,
        translations,
        currentTranslation = 0;

    function animateTranslation(element){
        currentTranslation++;
        if (currentTranslation%translations.length === 0){
            currentTranslation = 0;
        }
        $(element)
            .blast({delimiter: 'character'})
            .velocity('transition.fadeIn', {
                duration: 1000,
                stagger: 100,
                delay: 0,
                begin: function(){
                    $(element).css({opacity:'1'});
                },
                complete: function(){
                    $(element)
                        .blast({delimiter: 'character'})
                        .velocity('transition.fadeOut', {
                            duration: 1000,
                            stagger: 100,
                            delay: 1000,
                            complete: function(){
                                $(element).velocity('transition.fadeOut', {
                                    complete: function(){
                                        animateTranslation(translations[currentTranslation]);
                                    }
                                });
                            }
                        });
                }
            });
    }

    this.init = function(){
        if ($('#page-error-404').length > 0) {
            //variables
            translations = $('.error-translations');

            //animation
            setTimeout(function () {
                animateTranslation(translations[0]);
            }, 750);
        }
    };

}).apply(app.views.error404);