var music = {};

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

};