(function(){
    
    var that = app.views.music,
        $ = jQuery,
        posts;
    
    this.init = function(){
        if($('#page-music').length > 0){
            //variables
            posts = $('.post-container');

            //functions
            posts.on('click touchend', function(event){
                event.preventDefault();
                window.location.href = $(this).attr('data-url');
            });
        }
    };
    
}).apply(app.views.music);