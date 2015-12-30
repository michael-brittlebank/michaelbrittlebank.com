var homepage = {},
    squareBlocks,
    bodyHighlightBlocks,
    bodyHighlightBlocksText,
    imageHighlightBlocks,
    imageHighlightBlocksText,
    bodyBlockTopHeight,
    bodyBlockBottomHeight,
    bodyBlockTotalHeight,
    activeBodyBlock = null,
    activeImageBlock = null;

homepage.grid = {
    activateBodyBlock: function(){
        $(activeBodyBlock).find('.hover-filter-front').first().velocity({height: bodyBlockBottomHeight+'px'},{duration:500});
        $(activeBodyBlock).find('.hover-filter-overlay').first().css({height: '100%'});
        $(activeBodyBlock).find('.hover-filter-back').first().velocity({height: bodyBlockTopHeight+'px',bottom:bodyBlockTopHeight+'px'},{duration:500,delay:350});
        $(activeBodyBlock).find('.hover-filter-text').first().velocity({height: '65px',opacity:'1'},{duration:500,delay:300});
    },
    deactivateBodyBlock: function(){
        $(activeBodyBlock).find('.hover-filter-overlay').first().css({height: '0'});
        $(activeBodyBlock).find('.hover-filter-back').first().velocity('stop').velocity({height: '0',bottom:'0'});
        $(activeBodyBlock).find('.hover-filter-text').first().velocity('stop').velocity({height: '0',opacity:'0'});
        $(activeBodyBlock).find('.hover-filter-front').first().velocity('stop').velocity({height: '0'});
        activeBodyBlock = null;
    },
    activateImageBlock: function(){
        $(activeImageBlock).find('.hover-filter-back').first().velocity({width: '100%'},{duration:500});
        $(activeImageBlock).find('.hover-filter-text').first().velocity({opacity:'1'},{duration:500,delay:300});
        $(activeImageBlock).find('.hover-filter-overlay').first().css({height: '100%'});
    },
    deactivateImageBlock: function(){
        $(activeImageBlock).find('.hover-filter-back').first().velocity('stop').velocity({width: '0'});
        $(activeImageBlock).find('.hover-filter-text').first().velocity('stop').velocity({opacity:'0'});
        $(activeImageBlock).find('.hover-filter-overlay').first().css({height: '0'});
        activeImageBlock = null;
    },
    makeSquare: function(){
        bodyBlockTotalHeight = site.helpers.parseIntFromString($($(squareBlocks)[0]).css('width'));
        $(squareBlocks).css('height', bodyBlockTotalHeight+'px');
        if (bodyBlockTotalHeight%2===0){
            bodyBlockBottomHeight = bodyBlockTopHeight = bodyBlockTotalHeight/2;
        } else {
            bodyBlockBottomHeight = Math.floor(bodyBlockTopHeight);
            bodyBlockTopHeight = Math.ceil(bodyBlockTopHeight);
        }
    },
    revealBlocks: function(){
        var blockOrder = [
            Math.round(Math.random())?1:3,
            Math.round(Math.random())?2:4
        ];
        blockOrder.push(blockOrder.indexOf(1) === -1?1:3);
        blockOrder.push(blockOrder.indexOf(2) === -1?2:4);
        for (var i = 0; i < blockOrder.length;i++){
            site.animation.fadeIn('#homepage-block-'+blockOrder[i],1500,250*(i+1),0);
        }
    }
};

homepage.init = function(){
    //variables
    squareBlocks = $('.grid-block');
    bodyHighlightBlocks = $(squareBlocks).filter('.body-highlight');
    bodyHighlightBlocksText = $(bodyHighlightBlocks).find('.hover-filter-overlay');
    imageHighlightBlocks = $(squareBlocks).filter('.image-highlight');
    imageHighlightBlocksText = $(imageHighlightBlocks).find('.hover-filter-overlay');
    //animation
    $('.expand-in').velocity('transition.expandIn');
    //event handlers
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
    $(imageHighlightBlocksText).on('touch click',function(){
        if (activeImageBlock) {
            window.location.href = $(activeImageBlock).data('url');
        }
    });
    $(window).on('load', function(){
            homepage.grid.makeSquare();
            homepage.grid.revealBlocks();
            $('.banner').velocity({opacity:0.5},{duration:1500});
        })
        .on('resize', function() {
            homepage.grid.makeSquare();
        });
};

