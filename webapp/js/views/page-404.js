var page404 = {};

page404.init = function(){
    $(".page-tagline")
        .blast({delimiter: "character"})
        .velocity("transition.fadeIn", {
            duration: 1250,
            stagger: 100,
            delay: 500
        });
};