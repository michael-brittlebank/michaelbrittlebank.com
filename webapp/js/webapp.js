var site = {};

site.screen = {
    documentElement: document.documentElement,
    body: document.getElementsByTagName('body')[0],
    windowWidth: window.innerWidth || site.screen.documentElement.clientWidth || site.screen.body.clientWidth,
    windowHeight: window.innerHeight|| site.screen.documentElement.clientHeight|| site.screen.body.clientHeight
};

site.helpers = {
    getRandomInt: function (min, max) {
        return Math.floor(Math.random() * (max - min)) + min;
    }
};

site.animation = {
    fadeIn: function(element,duration, delay){
        $(element).css({visibility:'visible'}).velocity('transition.fadeIn',{duration:duration,delay:delay});
    },
    fadeOut: function(element,duration, delay){
        $(element).velocity('transition.fadeOut',{
            duration:duration,
            delay:delay,
            complete: function(elements) {
                $(elements).css({visibility:'hidden'});
            }
        });
    }
};

site.init = function(){
    var modalOverlay = $('#modal-overlay'),
        closeButtons = $('.close-button'),
        activeModal;
    //foundation init
    $(document).foundation();
    //loading animation
    site.animation.fadeIn('header',1500,0);
    site.animation.fadeIn('footer',1500,1000);
    /**
     * listeners
     */
        //modal listeners
    $(document).on('closeme.zf.reveal', function(event){
            if (!activeModal) {
                activeModal = event.target;
                $(modalOverlay).velocity('stop');
                $(activeModal).velocity('stop');
                site.animation.fadeIn(modalOverlay, 500, 0);
                site.animation.fadeIn(activeModal, 500, 0);
            }
        })
        .on('closed.zf.reveal', function(){
            site.animation.fadeOut(modalOverlay,750,0);
            activeModal = null;
        });
    $(closeButtons).on('click touch',function() {
        //manually close foundation modal
        site.animation.fadeOut(activeModal, 750, 0);
    });
    $(modalOverlay).on('click touch',function(){
        $(closeButtons).click();
    });
    /**
     * polyfills
     */
    /* requestAnimationFrame polyfill
     https://gist.github.com/paulirish/1579671
     */
    var lastTime = 0,
        vendors = ['ms', 'moz', 'webkit', 'o'];
    for(var i = 0; i < vendors.length && !window.requestAnimationFrame; ++i) {
        window.requestAnimationFrame = window[vendors[i]+'RequestAnimationFrame'];
        window.cancelAnimationFrame = window[vendors[i]+'CancelAnimationFrame'] || window[vendors[i]+'CancelRequestAnimationFrame'];
    }
    if (!window.requestAnimationFrame) {
        window.requestAnimationFrame = function (callback, element) {
            var currTime = new Date().getTime();
            var timeToCall = Math.max(0, 16 - (currTime - lastTime));
            var id = window.setTimeout(function () {
                    callback(currTime + timeToCall);
                },
                timeToCall);
            lastTime = currTime + timeToCall;
            return id;
        };
    }
    if (!window.cancelAnimationFrame) {
        window.cancelAnimationFrame = function (id) {
            clearTimeout(id);
        };
    }
};

site.init();