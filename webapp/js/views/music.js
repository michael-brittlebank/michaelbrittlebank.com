var grid,
    loadMoreButton,
    page = 2,//loads 20 from the start
    music = {};

music.loadMoreArticles = function(e){
    page++;
    $.ajax({
        method: "POST",
        url: "/api/loadMorePosts",
        data: {
            page: page
        },
        statusCode: {
            200: function (data) {
                $(grid).append(data);
                if ((data.match(/post-item/g) || []).length < 20){
                    $(loadMoreButton).hide();
                }
            },
            204: function () {
                $(loadMoreButton).hide();
            }
        },
        error: function(){
            $(loadMoreButton).hide();
        }
    });
};

music.init = function(){
    //variables
    grid = $('#grid-post');
    loadMoreButton = $('#load-more');
    //loading animation
    $('.post').css({visibility: 'visible'}).velocity('transition.fadeIn',{
        delay: 750,
        duration: 1000,
        stagger: 200,
        begin: function(){
            $(grid).masonry('layout');
        }
    });
    //grid layout
    $(grid).masonry({
        itemSelector: '.post',
        columnWidth: '.post',
        percentPosition: true
    });
};