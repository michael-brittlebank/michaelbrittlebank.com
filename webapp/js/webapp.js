var site = {};

site.screen = {
    documentElement: document.documentElement,
    body: document.getElementsByTagName('body')[0],
    windowWidth: window.innerWidth || site.screen.documentElement.clientWidth || site.screen.body.clientWidth,
    windowHeight: window.innerHeight|| site.screen.documentElement.clientHeight|| site.screen.body.clientHeight
};

site.helpers = {
    //http://stackoverflow.com/questions/1527803/generating-random-numbers-in-javascript-in-a-specific-range
    getRandomInt: function (min, max) {
        return Math.floor(Math.random() * (max - min)) + min;
    },
    getRandomElement: function(array){
        return array[site.helpers.getRandomInt(0, array.length-1)];
    },
    //http://stackoverflow.com/questions/2450954/how-to-randomize-shuffle-a-javascript-array
    shuffleArray: function(array) {
        for (var i = array.length - 1; i > 0; i--) {
            var j = Math.floor(Math.random() * (i + 1));
            var temp = array[i];
            array[i] = array[j];
            array[j] = temp;
        }
        return array;
    },
    logger: function(name, variable){
        console.log(name);
        console.log(variable);
    },
    parseIntFromString: function(string){
        //http://stackoverflow.com/questions/395163/get-css-top-value-as-number-not-as-string
        return parseInt(string, 10);
    }
};

site.animation = {
    fadeIn: function(element,duration,delay,stagger){
        $(element).css({visibility:'visible'}).velocity('transition.fadeIn',{
            duration:duration,
            delay:delay,
            stagger:stagger
        });
    },
    fadeOut: function(element,duration, delay){
        $(element).velocity('transition.fadeOut',{
            duration:duration,
            delay:delay,
            complete: function(elements) {
                $(elements).css({visibility:'hidden'});
            }
        });
    },
    fadeOutAndRemove: function(element,duration,delay){
        $(element).velocity({opacity: 0, visibility: 'hidden'}, {
            duration: duration,
            delay: delay,
            queue: false,
            complete: function (elements) {
                $(elements).velocity('stop',true).remove();
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
    site.animation.fadeIn('header',1500,0,0);
    site.animation.fadeIn('footer',1500,1000,0);
    /**
     * listeners
     */
        //modal listeners
    $(document).on('closeme.zf.reveal', function(event){
            if (!activeModal) {
                activeModal = event.target;
                $(modalOverlay).velocity('stop');
                $(activeModal).velocity('stop');
                $(modalOverlay).css({visibility:'visible','z-index':1005}).velocity({height: '100%',opacity:1},{
                    duration:500,
                    delay:0,
                    stagger:0
                });
                site.animation.fadeIn(activeModal, 500, 0,0);
            }
        })
        .on('closed.zf.reveal', function(){
            $(modalOverlay).velocity({height:0,opacity:0},{
                duration:750,
                delay:0,
                complete: function(elements) {
                    $(elements).css({visibility:'hidden','z-index':-1});
                }
            });
            activeModal = null;
        });
    $(closeButtons).on('click touch',function() {
        //manually close foundation modal
        site.animation.fadeOut(activeModal, 250, 0);
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