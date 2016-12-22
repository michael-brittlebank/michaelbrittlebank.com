var post = {};

post.init = function(){
    site.animation.fadeIn('.post-title',1000,750,0);
    site.animation.fadeIn('.post-date',1000,1000,0);
    site.animation.fadeIn('.post-divider',1000,1250,0);
    site.animation.fadeIn('.post-body',750,1500,0);
    site.animation.fadeIn('.post-body p',1000,1750,200);
    $(".gallery").justifiedGallery({
        rowHeight : 150,
        rel : 'gallery',
        margins : 5
    }).on('jg.complete', function () {
            $(this).find('.gallery-image').colorbox({
                maxWidth : '80%',
                maxHeight : '80%',
                opacity : 0.8,
                transition : 'elastic',
                current : ''
            });
        });
};
