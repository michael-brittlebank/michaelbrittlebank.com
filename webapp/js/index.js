var site = {};

site.screen = {
    documentElement: document.documentElement,
    body: document.getElementsByTagName('body')[0],
    windowWidth: window.innerWidth || site.screen.documentElement.clientWidth || site.screen.body.clientWidth,
    windowHeight: window.innerHeight|| site.screen.documentElement.clientHeight|| site.screen.body.clientHeight
};

site.getRandomInt = function(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
};

site.init = function(){
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