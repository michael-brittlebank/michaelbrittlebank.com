var homepage = {},
    squareBlocks,
    activeBlock = null;

homepage.grid = {
    activateBlock: function(id){
        $(activeBlock).find('.hover-filter-front').velocity({height: '50%'},{duration:500,queue: false});
        setTimeout(function() {
            $(activeBlock).find('.hover-filter-back').velocity({height: '50%',bottom:'50%'},{duration:500,queue: false});
            setTimeout(function() {
                $(activeBlock).find('.hover-filter-text').velocity({height: '65px',opacity:'1'},{duration:500,queue: false});
            }, 300);
        }, 350);
    },
    deactivateBlock: function(id){
        $(activeBlock).find('.hover-filter-back').velocity('stop', true).velocity({height: '0',bottom:'0'});
        $(activeBlock).find('.hover-filter-text').velocity('stop', true).velocity({height: '0',opacity:'0'});
        $(activeBlock).find('.hover-filter-front').velocity('stop', true).velocity({height: '0'});
    },
    makeSquare: function(){
        $(squareBlocks).css('height', $($(squareBlocks)[0]).css('width'));
    }
};

homepage.init = function(){
    squareBlocks = $('.grid-block');
    $(".expand-in").velocity("transition.expandIn");
    $('.body-highlight').on('mouseover', function(){
            if (!activeBlock || ($(this).attr('id') && $(activeBlock).attr('id') !== $(this).attr('id'))){
                if (activeBlock){
                    homepage.grid.deactivateBlock($(activeBlock).attr('id'));
                }
                activeBlock = $(this);
                homepage.grid.activateBlock($(activeBlock).attr('id'));
            }
        })
        .on('mouseleave',function(){
            if (activeBlock){
                homepage.grid.deactivateBlock($(activeBlock).attr('id'));
            }
            activeBlock = null;
        });
    $(window)
        .load(function(){
            homepage.grid.makeSquare();
        })
        .resize(function() {
            homepage.grid.makeSquare();
    });
};

