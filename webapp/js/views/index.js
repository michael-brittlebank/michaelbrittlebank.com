var homepage = {},
    activeBlock = null;

homepage.grid = {
    activateBlock: function(id){
        $(activeBlock).find('.hover-filter-front').velocity({height: '50%'},{duration:500,queue: false});
        setTimeout(function() {
            $(activeBlock).find('.hover-filter-back').velocity({height: '50%',bottom:'50%'},{duration:500,queue: false});
        }, 500);
    },
    deactivateBlock: function(id){
        $(activeBlock).find('.hover-filter-back').velocity('stop', true).velocity({height: '0',bottom:'0'});
        $(activeBlock).find('.hover-filter-front').velocity('stop', true).velocity({height: '0'});
    }
};

homepage.init = function(){
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
};

