(function(){
    
    var that = app.views.resume,
        $ = jQuery,
        resumeBody;

    function fadeInText(){
        resumeBody
            .blast({delimiter: 'element'})
            .velocity('transition.fadeIn',{
                duration: 1000,
                stagger: 30,
                delay: 0,
                begin: function(){
                    resumeBody.css({opacity: 1});
                }
            });
    }
    
    this.init = function(){
        if($('#page-resume').length > 0){
            //variables
            resumeBody = $('#resume-body');

            //functions
            fadeInText();
        }
    };
    
}).apply(app.views.resume);