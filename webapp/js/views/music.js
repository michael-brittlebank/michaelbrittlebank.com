var grid,
    music = {};

music.loadMoreArticles = function(e){
    console.log("load more");
    //var pageUrl = $(e.currentTarget).data('page-url');
    //page++;
    //$.ajax({
    //    method: "POST",
    //    url: "/api/loadMoreArticles",
    //    data: {
    //        page: page,
    //        count: 20,
    //        pageUrl: pageUrl
    //    },
    //    statusCode: {
    //        200: function (data) {
    //            $('#grid').append(data);
    //            if ((data.match(/post-item/g) || []).length < 20){
    //                $('#load-more').hide();
    //            }
    //        },
    //        204: function () {
    //            $('#load-more').hide();
    //        }
    //    },
    //    error: function(){
    //        $('#load-more').hide();
    //    }
    //});
};

music.init = function(){
    //variables
    grid = $('.grid');
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