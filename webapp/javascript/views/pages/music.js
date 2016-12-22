var grid,
    gridMasonry,
    loadMoreButton,
    loadingInProgress = false,
    loadingSpinner,
    page = 2,//loads 20 from the start
    data,
    music = {};

music.loading = function(isLoading){
    if(isLoading) {
        loadingInProgress = true;
        $(loadMoreButton).addClass('disabled');
        site.animation.fadeIn(loadingSpinner,250,0,0);
    } else {
        loadingInProgress = false;
        $(loadMoreButton).removeClass('disabled');
        site.animation.fadeOut(loadingSpinner,250,0,0);
    }
};

music.loadMoreArticles = function(e){
    if (!loadingInProgress) {
        music.loading(true);
        $.ajax({
            method: "POST",
            url: "/api/load-posts",
            data: {
                page: page
            },
            statusCode: {
                200: function (response) {
                    page++;
                    data = response;
                    var processedData = $.parseHTML(response),
                        dataString = 'data-group="',
                        group = data.substring(data.indexOf(dataString) + dataString.length, data.indexOf('"', data.indexOf(dataString) + dataString.length));
                    gridMasonry.append(processedData).masonry('appended', processedData);
                },
                204: function () {
                    $(loadMoreButton).hide();
                }
            },
            error: function () {
                $(loadMoreButton).hide();
            },
            complete: function(){
                music.loading(false);
            }
        });
    }
};

music.init = function(){
    //variables
    grid = $('#grid-post');
    loadMoreButton = $('#load-more');
    loadingSpinner = $('#loading-spinner');
    //grid layout
    gridMasonry = $(grid).masonry({
        itemSelector: '.post',
        columnWidth: '.post',
        percentPosition: true
    });
    //loading animation
    $('.post').css({visibility: 'visible'}).velocity('transition.fadeIn',{
        delay: 750,
        duration: 1000,
        stagger: 200,
        begin: function(){
            gridMasonry.masonry('layout');
        }
    });
};