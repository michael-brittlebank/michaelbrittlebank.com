var taglineContainer,
    translations,
    currentTranslation = 0,
    page404 = {};

page404.animateTranslation = function(element){
    currentTranslation++;
    if (currentTranslation%translations.length === 0){
        currentTranslation = 0;
    }
    $(element)
        .blast({delimiter: "character"})
        .velocity("transition.fadeIn", {
            duration: 1000,
            stagger: 100,
            delay: 0,
            begin: function(){
                $(element).css({opacity:'1'});
            },
            complete: function(){
                $(element)
                    .blast({delimiter: "character"})
                    .velocity("transition.fadeOut", {
                        duration: 1000,
                        stagger: 100,
                        delay: 1000,
                        complete: function(){
                            $(element).velocity("transition.fadeOut", {
                                complete: function(){
                                    page404.animateTranslation(translations[currentTranslation]);
                                }
                            });
                        }
                    });
            }
        });
};

page404.init = function(){
    taglineContainer = $('#container-translations');
    translations = $('.translations');
    console.log(translations.length);
    page404.animateTranslation(translations[0]);
};