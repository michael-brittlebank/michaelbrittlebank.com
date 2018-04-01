(function(){

    var that = app.views.homepage,
        $ = jQuery,
        helpers = app.helpers,
        animations = app.animations,
        mediaQueries = app.mediaQueries,
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
            deactivateImageBlock(activeImageBlock);
        }
        if (activeIconBlock){
            deactivateIconBlock(activeIconBlock);
        }
    }

    //animation functions
    function activateIconBlock(element){
        element.find('.'+filterFrontClass).velocity('stop').velocity({height: iconBlockBottomHeight+'px'},{duration:500});
        element.find('.'+filterOverlayClass).addClass(helpers.activeClass);
        element.find('.'+filterBackClass).velocity('stop').velocity({height: iconBlockTopHeight+'px',bottom:iconBlockBottomHeight+'px'},{duration:500,delay:350});
        element.find('.'+filterTextClass).velocity('stop').velocity({top: '0px',opacity:'1'},{duration:500,delay:300});
    }

    function deactivateIconBlock(element){
        element.find('.'+filterOverlayClass).removeClass(helpers.activeClass);
        element.find('.'+filterBackClass).velocity('stop').velocity({height: '0px',bottom:'0px'});
        element.find('.'+filterTextClass).velocity('stop').velocity({top: '75px',opacity:'0'});
        element.find('.'+filterFrontClass).velocity('stop').velocity({height: '0px'});
        activeIconBlock = null;
    }

    function activateImageBlock(element){
        element.find('.'+filterBackClass).velocity('stop').velocity({width: '100%'},{duration:500});
        element.find('.'+filterTextClass).velocity('stop').velocity({opacity:'1'},{duration:500,delay:150});
        element.find('.'+filterOverlayClass).addClass(helpers.activeClass);
    }

    function deactivateImageBlock(element){
        element.find('.'+filterBackClass).velocity('stop').velocity({width: '0px'});
        element.find('.'+filterTextClass).velocity('stop').velocity({opacity:'0'});
        element.find('.'+filterOverlayClass).removeClass(helpers.activeClass);
        activeImageBlock = null;
    }

    function blockHoverHandler(element){
        if (element.hasClass(iconBlockClass)){
            if (!activeIconBlock || activeIconBlock.attr('id') !== element.attr('id')) {
                resetBlocks();
                activeIconBlock = element;
                activateIconBlock(activeIconBlock);
            }
        } else {
            if (!activeImageBlock || activeImageBlock.attr('id') !== element.attr('id')) {
                resetBlocks();
                activeImageBlock = element;
                activateImageBlock(activeImageBlock);
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

    function checkForMobileScreenSize(resizeEvent){
        if(mediaQueries.isMobile()){
            _.each(homepageBlocks, function(entry,index){
                setTimeout(function(){
                    if ($(entry).hasClass(iconBlockClass)){
                        activateIconBlock($(entry));
                    } else {
                        activateImageBlock($(entry));
                    }
                }, 400*index);
            });
        } else {
            if (resizeEvent){
                _.each(homepageBlocks, function(entry){
                    if ($(entry).hasClass(iconBlockClass)){
                        deactivateIconBlock($(entry));
                    } else {
                        deactivateImageBlock($(entry));
                    }
                });
            }
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
            animations.fadeIn(homepageBlocks);
            squareHomepageBlocks();
            revealHomepageBlocks();
            checkForMobileScreenSize();

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
                    checkForMobileScreenSize(true);
                });
        }
    };

}).apply(app.views.homepage);