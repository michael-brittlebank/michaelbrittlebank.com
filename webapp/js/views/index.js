var homepage = {},
    squareBlocks,
    bodyHighlightBlocks,
    bodyHighlightBlocksText,
    activeBlock = null;

homepage.grid = {
    activateBlock: function(){
        $(activeBlock).find('.hover-filter-front').first().velocity({height: '50%'},{duration:500,queue: false});
        $(activeBlock).find('.hover-filter-overlay').first().css({height: '100%'});
        setTimeout(function() {
            $(activeBlock).find('.hover-filter-back').first().velocity({height: '50%',bottom:'50%'},{duration:500,queue: false});
            setTimeout(function() {
                $(activeBlock).find('.hover-filter-text').first().velocity({height: '65px',opacity:'1'},{duration:500,queue: false});
            }, 300);
        }, 350);
    },
    deactivateBlock: function(){
        $(activeBlock).find('.hover-filter-overlay').first().css({height: '0'});
        $(activeBlock).find('.hover-filter-back').first().velocity('stop', true).velocity({height: '0',bottom:'0'});
        $(activeBlock).find('.hover-filter-text').first().velocity('stop', true).velocity({height: '0',opacity:'0'});
        $(activeBlock).find('.hover-filter-front').first().velocity('stop', true).velocity({height: '0'});
        activeBlock = null;
    },
    makeSquare: function(){
        $(squareBlocks).css('height', $($(squareBlocks)[0]).css('width'));
    }
};

homepage.init = function(){
    squareBlocks = $('.grid-block');
    bodyHighlightBlocks = $(squareBlocks).filter('.body-highlight');
    bodyHighlightBlocksText = $(bodyHighlightBlocks).find('.hover-filter-overlay');
    $(".expand-in").velocity("transition.expandIn");
    $(bodyHighlightBlocks).on('mouseover touch click', function(){
            if (!activeBlock || ($(this).attr('id') && $(activeBlock).attr('id') !== $(this).attr('id'))){
                if (activeBlock){
                    homepage.grid.deactivateBlock();
                }
                activeBlock = $(this);
                homepage.grid.activateBlock();
            }
        })
        .on('mouseleave',function(){
            if (activeBlock){
                homepage.grid.deactivateBlock();
            }
        });
    $(bodyHighlightBlocksText).on('touch click',function(){
        if(activeBlock){
            window.location.href = $(activeBlock).data('url');
        }
    });
    $(window).load(function(){
            homepage.grid.makeSquare();
        })
        .resize(function() {
            homepage.grid.makeSquare();
        });
};

