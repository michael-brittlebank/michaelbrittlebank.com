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