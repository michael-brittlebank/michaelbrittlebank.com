(function(){

    var that = app.views.homepage,
        $ = jQuery,
        helpers = app.helpers,
        animations = app.animations,
        homepageBlocks,
        iconBlocks,
        iconBlocksOverlay,
        imageBlocks,
        imageBlocksOverlay,
        iconBlockTopHeight,
        iconBlockBottomHeight,
        iconBlockTotalHeight,
        activeIconBlock,
        activeImageBlock,
        homepageBlockName = 'homepage-block',
        iconBlockClass = 'homepage-icon-block',
        imageBlockClass = 'homepage-image-block',
        filterFrontClass = 'hover-filter-front',
        filterOverlayClass = 'hover-filter-overlay',
        filterBackClass = 'hover-filter-back',
        filterTextClass = 'hover-filter-text',
        touchDrag = false;

    //helper functions
    function squareHomepageBlocks(){
        iconBlockTotalHeight = helpers.parseIntFromString(homepageBlocks.css('width'));
        homepageBlocks.css('height', iconBlockTotalHeight+'px');
        if (iconBlockTotalHeight%2===0){
            iconBlockBottomHeight = iconBlockTopHeight = iconBlockTotalHeight/2;
        } else {
            iconBlockBottomHeight = Math.floor(iconBlockTotalHeight/2);
            iconBlockTopHeight = Math.ceil(iconBlockTotalHeight/2);
        }
    }

    function revealHomepageBlocks(){
        _.each(homepageBlocks, function(entry, index){
            animations.fadeIn($('#'+homepageBlockName+'-'+index),{
                duration:1500,
                delay: 250*(index+1)
            });
        });
    }

    function resetBlocks(){
        if (activeImageBlock){
            deactivateImageBlock();
        }
        if (activeIconBlock){
            deactivateIconBlock();
        }
    }

    //animation functions
    function activateIconBlock(){
        activeIconBlock.find('.'+filterFrontClass).velocity({height: iconBlockBottomHeight+'px'},{duration:500});
        activeIconBlock.find('.'+filterOverlayClass).css({height: '100%'});
        activeIconBlock.find('.'+filterBackClass).velocity({height: iconBlockTopHeight+'px',bottom:iconBlockBottomHeight+'px'},{duration:500,delay:350});
        activeIconBlock.find('.'+filterTextClass).velocity({top: '0px',opacity:'1'},{duration:500,delay:300});
    }

    function deactivateIconBlock(){
        activeIconBlock.find('.'+filterOverlayClass).css({height: '0px'});
        activeIconBlock.find('.'+filterBackClass).velocity('stop').velocity({height: '0px',bottom:'0px'});
        activeIconBlock.find('.'+filterTextClass).velocity('stop').velocity({top: '75px',opacity:'0'});
        activeIconBlock.find('.'+filterFrontClass).velocity('stop').velocity({height: '0px'});
        activeIconBlock = null;
    }

    function activateImageBlock(){
        activeImageBlock.find('.'+filterBackClass).velocity({width: '100%'},{duration:500});
        activeImageBlock.find('.'+filterTextClass).velocity({opacity:'1'},{duration:500,delay:150});
        activeImageBlock.find('.'+filterOverlayClass).css({height: '100%'});
    }

    function deactivateImageBlock(){
        activeImageBlock.find('.'+filterBackClass).velocity('stop').velocity({width: '0px'});
        activeImageBlock.find('.'+filterTextClass).velocity('stop').velocity({opacity:'0'});
        activeImageBlock.find('.'+filterOverlayClass).css({height: '0px'});
        activeImageBlock = null;
    }

    function blockHoverHandler(element){
        if (element.hasClass(iconBlockClass)){
            if (!activeIconBlock || activeIconBlock.attr('id') !== element.attr('id')) {
                resetBlocks();
                activeIconBlock = element;
                activateIconBlock();
            }
        } else {
            if (!activeImageBlock || activeImageBlock.attr('id') !== element.attr('id')) {
                resetBlocks();
                activeImageBlock = element;
                activateImageBlock();
            }
        }
    }

    function blockClickHandler(element){
        if(element){
            window.location.href = element.attr('data-url');
        } else {
            window.location.href = activeImageBlock?activeImageBlock.attr('data-url'):activeIconBlock.attr('data-url');
        }
    }

    this.init = function(){
        if($('#page-homepage').length > 0) {
            //variables
            homepageBlocks = $('.'+homepageBlockName);
            iconBlocks = homepageBlocks.filter('.'+iconBlockClass);
            iconBlocksOverlay = $(iconBlocks).find('.'+filterOverlayClass);
            imageBlocks = homepageBlocks.filter('.'+imageBlockClass);
            imageBlocksOverlay = $(imageBlocks).find('.'+filterOverlayClass);

            //functions
            squareHomepageBlocks();
            revealHomepageBlocks();

            //listeners
            $(iconBlocks)
                .on('mouseover', function (event) {
                    event.preventDefault();
                    blockHoverHandler($(this));
                })
                .on('mouseleave', function () {
                    resetBlocks();
                })
                //mobile touch events
                .on("touchstart", function () {
                    touchDrag = false;
                })
                .on("touchmove", function () {
                    touchDrag = true;
                })
                .on('touchend', function (event) {
                    if (!touchDrag) {
                        event.preventDefault();
                        blockClickHandler($(this));
                    }
                });

            $(iconBlocksOverlay)
                .on('click', function (event) {
                    event.preventDefault();
                    blockClickHandler();
                });

            $(imageBlocks)
                .on('mouseover', function (event) {
                    event.preventDefault();
                    blockHoverHandler($(this));
                })
                .on('mouseleave', function () {
                    resetBlocks();
                })
                //mobile touch events
                .on("touchstart", function () {
                    touchDrag = false;
                })
                .on("touchmove", function () {
                    touchDrag = true;
                })
                .on('touchend', function (event) {
                    if (!touchDrag) {
                        event.preventDefault();
                        blockClickHandler($(this));
                    }
                });

            $(imageBlocksOverlay)
                .on('click', function (event) {
                    event.preventDefault();
                    blockClickHandler();
                });

            $(window)
                .on('resize', function () {
                    squareHomepageBlocks();
                });
        }
    };

}).apply(app.views.homepage);