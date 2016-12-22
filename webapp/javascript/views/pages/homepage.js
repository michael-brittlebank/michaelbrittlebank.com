(function(){

    var that = app.views.homepage,
        $ = jQuery,
        squareBlocks,
        bodyHighlightBlocks,
        bodyHighlightBlocksText,
        imageHighlightBlocks,
        imageHighlightBlocksText,
        bodyBlockTopHeight,
        bodyBlockBottomHeight,
        bodyBlockTotalHeight,
        activeBodyBlock = null,
        activeImageBlock = null,
        touchDrag = false;

    this.grid = {
        activateBodyBlock: function(){
            $(activeBodyBlock).find('.hover-filter-front').first().velocity({height: bodyBlockBottomHeight+'px'},{duration:500});
            $(activeBodyBlock).find('.hover-filter-overlay').first().css({height: '100%'});
            $(activeBodyBlock).find('.hover-filter-back').first().velocity({height: bodyBlockTopHeight+'px',bottom:bodyBlockBottomHeight+'px'},{duration:500,delay:350});
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
            bodyBlockTotalHeight = app.helpers.parseIntFromString($($(squareBlocks)[0]).css('width'));
            $(squareBlocks).css('height', bodyBlockTotalHeight+'px');
            if (bodyBlockTotalHeight%2===0){
                bodyBlockBottomHeight = bodyBlockTopHeight = bodyBlockTotalHeight/2;
            } else {
                bodyBlockBottomHeight = Math.floor(bodyBlockTotalHeight/2);
                bodyBlockTopHeight = Math.ceil(bodyBlockTotalHeight/2);
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
                app.animations.fadeIn('#homepage-block-'+blockOrder[i],1500,250*(i+1),0);
            }
        }
    };

    this.events = {
        imageBlockHandler: function(element){
            if (!activeImageBlock || ($(element).attr('id') && $(activeImageBlock).attr('id') !== $(element).attr('id'))) {
                that.events.resetBlocks();
                activeImageBlock = $(element);
                that.grid.activateImageBlock();
            }
        },
        bodyBlockHandler: function(element){
            if (!activeBodyBlock || ($(element).attr('id') && $(activeBodyBlock).attr('id') !== $(element).attr('id'))){
                that.events.resetBlocks();
                activeBodyBlock = $(element);
                that.grid.activateBodyBlock();
            }
        },
        blockClick: function(){
            if (activeImageBlock) {
                window.location.href = $(activeImageBlock).data('url');
            } else if (activeBodyBlock) {
                window.location.href = $(activeBodyBlock).data('url');
            }
        },
        resetBlocks: function(){
            if (activeBodyBlock){
                that.grid.deactivateBodyBlock();
            }
            if (activeImageBlock){
                that.grid.deactivateImageBlock();
            }
        }
    };

    this.init = function(){
        //variables
        squareBlocks = $('.grid-block');
        bodyHighlightBlocks = $(squareBlocks).filter('.body-highlight');
        bodyHighlightBlocksText = $(bodyHighlightBlocks).find('.hover-filter-overlay');
        imageHighlightBlocks = $(squareBlocks).filter('.image-highlight');
        imageHighlightBlocksText = $(imageHighlightBlocks).find('.hover-filter-overlay');
        //animation
        $('.expand-in').velocity('transition.expandIn');
        //event handlers
        $(bodyHighlightBlocks).on('mouseover', function(event){
            event.preventDefault();
            that.events.bodyBlockHandler($(this));
        })
            .on('mouseleave',function(){
                that.events.resetBlocks();
            })
            .on("touchstart", function(){
                touchDrag = false;
            })
            .on("touchmove", function(){
                touchDrag = true;
            })
            .on('touchend', function(event){
                if (!touchDrag){
                    event.preventDefault();
                    that.events.bodyBlockHandler($(this));
                }
            });
        $(bodyHighlightBlocksText).on('click',function(event){
            event.preventDefault();
            that.events.blockClick();
        })
            .on("touchstart", function(){
                touchDrag = false;
            })
            .on("touchmove", function(){
                touchDrag = true;
            })
            .on('touchend', function(event){
                if (!touchDrag){
                    event.preventDefault();
                    that.events.blockClick();
                }
            });
        $(imageHighlightBlocks).on('mouseover', function(event){
            event.preventDefault();
            that.events.imageBlockHandler($(this));
        })
            .on('mouseleave',function(){
                that.events.resetBlocks();
            })
            .on("touchstart", function(){
                touchDrag = false;
            })
            .on("touchmove", function(){
                touchDrag = true;
            })
            .on('touchend', function(event){
                if (!touchDrag){
                    event.preventDefault();
                    that.events.imageBlockHandler($(this));
                }
            });
        $(imageHighlightBlocksText).on('click',function(event){
            event.preventDefault();
            that.events.blockClick();
        })
            .on("touchstart", function(){
                touchDrag = false;
            })
            .on("touchmove", function(){
                touchDrag = true;
            })
            .on('touchend', function(event){
                if (!touchDrag){
                    event.preventDefault();
                    that.events.blockClick();
                }
            });
        $(function(){
            that.grid.makeSquare();
            that.grid.revealBlocks();
            $('.banner').velocity({opacity:0.5},{duration:1500});
        });
        $(window).on('resize', function() {
            that.grid.makeSquare();
        });
    };

}).apply(app.views.homepage);