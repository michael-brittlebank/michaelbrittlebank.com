var homepage = {},
    squareBlocks,
    bodyHighlightBlocks,
    bodyHighlightBlocksText,
    imageHighlightBlocks,
    activeBodyBlock = null,
    activeImageBlock = null;

homepage.grid = {
    activateBodyBlock: function(){
        $(activeBodyBlock).find('.hover-filter-front').first().velocity({height: '50%'},{duration:500,queue: false});
        $(activeBodyBlock).find('.hover-filter-overlay').first().css({height: '100%'});
        setTimeout(function() {
            $(activeBodyBlock).find('.hover-filter-back').first().velocity({height: '50%',bottom:'50%'},{duration:500,queue: false});
            setTimeout(function() {
                $(activeBodyBlock).find('.hover-filter-text').first().velocity({height: '65px',opacity:'1'},{duration:500,queue: false});
            }, 300);
        }, 350);
    },
    deactivateBodyBlock: function(){
        $(activeBodyBlock).find('.hover-filter-overlay').first().css({height: '0'});
        $(activeBodyBlock).find('.hover-filter-back').first().velocity('stop', true).velocity({height: '0',bottom:'0'});
        $(activeBodyBlock).find('.hover-filter-text').first().velocity('stop', true).velocity({height: '0',opacity:'0'});
        $(activeBodyBlock).find('.hover-filter-front').first().velocity('stop', true).velocity({height: '0'});
        activeBodyBlock = null;
    },
    activateImageBlock: function(){
        $(activeImageBlock).find('.hover-filter-back').first().velocity({width: '100%'},{duration:500,queue: false});
        setTimeout(function() {
            $(activeImageBlock).find('.hover-filter-text').first().velocity({opacity:'1'},{duration:500,queue: false});
        }, 300);
    },
    deactivateImageBlock: function(){
        $(activeImageBlock).find('.hover-filter-back').first().velocity('stop', true).velocity({width: '0'});
        $(activeImageBlock).find('.hover-filter-text').first().velocity('stop', true).velocity({opacity:'0'});
        activeImageBlock = null;
    },
    makeSquare: function(){
        $(squareBlocks).css('height', $($(squareBlocks)[0]).css('width'));
    },
    showBlock: function(block, delay){
        setTimeout(function(){
            $(block).css({'z-index': 'auto'}).velocity('transition.fadeIn',{duration:1500});
        }, delay);
    },
    revealBlocks: function(){
        var blockOrder = [
            Math.round(Math.random())?1:3,
            Math.round(Math.random())?2:4
        ];
        blockOrder.push(blockOrder.indexOf(1) === -1?1:3);
        blockOrder.push(blockOrder.indexOf(2) === -1?2:4);
        for (var i = 0; i < blockOrder.length;i++){
            homepage.grid.showBlock($('#homepage-block-'+blockOrder[i]), 250*(i+1));
        }
    }
};

homepage.init = function(){
    squareBlocks = $('.grid-block');
    bodyHighlightBlocks = $(squareBlocks).filter('.body-highlight');
    bodyHighlightBlocksText = $(bodyHighlightBlocks).find('.hover-filter-overlay');
    imageHighlightBlocks = $(squareBlocks).filter('.image-highlight');
    $('.expand-in').velocity('transition.expandIn');
    $(bodyHighlightBlocks).on('mouseover touch click', function(){
            if (!activeBodyBlock || ($(this).attr('id') && $(activeBodyBlock).attr('id') !== $(this).attr('id'))){
                if (activeImageBlock){
                    homepage.grid.deactivateBodyBlock();
                }
                activeBodyBlock = $(this);
                homepage.grid.activateBodyBlock();
            }
        })
        .on('mouseleave',function(){
            if (activeBodyBlock){
                homepage.grid.deactivateBodyBlock();
            }
        });
    $(bodyHighlightBlocksText).on('touch click',function(){
        if(activeBodyBlock){
            window.location.href = $(activeBodyBlock).data('url');
        }
    });
    $(imageHighlightBlocks).on('mouseover touch click', function(){
            if (!activeImageBlock || ($(this).attr('id') && $(activeImageBlock).attr('id') !== $(this).attr('id'))){
                if (activeImageBlock){
                    homepage.grid.deactivateImageBlock();
                }
                activeImageBlock = $(this);
                homepage.grid.activateImageBlock();
            }
        })
        .on('mouseleave',function(){
            if (activeImageBlock){
                homepage.grid.deactivateImageBlock();
            }
        });
    $(window).load(function(){
            homepage.grid.makeSquare();
            homepage.grid.revealBlocks();
        })
        .resize(function() {
            homepage.grid.makeSquare();
        });
};

