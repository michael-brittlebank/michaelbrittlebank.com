window.requestAnimationFrame = window.requestAnimationFrame || window.mozRequestAnimationFrame || window.webkitRequestAnimationFrame || window.msRequestAnimationFrame;

var bubbles = {};

bubbles.nodeList = [];

bubbles.types = {
    smallBubble: 'small-bubble bubble',
    mediumBubble: 'medium-bubble bubble',
    largeBubble: 'large-bubble bubble'
};

bubbles.resetPath = function(node){
    node.duration = site.getRandomInt(10, 18);
    node.sinWidth = site.getRandomInt(100, site.screen.windowWidth/4);
    node.start = null;
    node.progress = null;
    return node;
};

bubbles.createBubbles = function(num, classes){
    var node,
        bubbleContainer = document.getElementById('bubble-container'),
        currentBubbleNum = 1,
        left,
        bottom,
        width,
        height,
        domNode;
    for (var i = 0; i < num; i++){
        left = site.getRandomInt(0,site.screen.windowWidth);
        bottom = site.getRandomInt(0,site.screen.windowHeight);
        node = {};
        switch(classes){
            case bubbles.types.smallBubble:
                width = height = site.getRandomInt(5,25);
                break;
            case bubbles.types.mediumBubble:
                width = height = site.getRandomInt(25,50);
                break;
            case bubbles.types.largeBubble:
                width = height = site.getRandomInt(50,75);
                break;
        }
        domNode = document.createElement('div');
        domNode.setAttribute('id', 'bubble'+currentBubbleNum);
        domNode.setAttribute('class', classes);
        domNode.style.width = width+'px';
        domNode.style.height = height+'px';
        bubbleContainer.appendChild(domNode);
        node.node = domNode;
        bubbles.nodeList.push(bubbles.resetPath(node));
        currentBubbleNum++;
    }
};

bubbles.animationQueue = function(){
    //todo, replace with velocity
    function step(timestamp) {
        var offsetModifier = 100,
            progress,
            x,
            y;
        for (var i = 0; i < bubbles.nodeList.length; i++){
            if(!bubbles.nodeList[i].start) {
                bubbles.nodeList[i].start = timestamp;
            }
            progress = (timestamp - bubbles.nodeList[i].start) / bubbles.nodeList[i].duration / 1000;
            x = progress * (site.screen.windowHeight+offsetModifier)/bubbles.nodeList[i].sinWidth;
            y = 2 * Math.sin(x);
            bubbles.nodeList[i].node.style.bottom = Math.min(site.screen.windowWidth, bubbles.nodeList[i].sinWidth * x)-offsetModifier + 'px';
            bubbles.nodeList[i].node.style.left = site.screen.windowHeight/2 + (bubbles.nodeList[i].sinWidth * y) + 'px';
            if(progress >= 1) {
                bubbles.nodeList[i] = bubbles.resetPath(bubbles.nodeList[i]);
            }
        }
        requestAnimationFrame(step);

    }
    requestAnimationFrame(step);
};

bubbles.init = function(smallBubbles, mediumBubbles, largeBubbles) {
    bubbles.createBubbles(smallBubbles, bubbles.types.smallBubble);
    bubbles.createBubbles(mediumBubbles, bubbles.types.mediumBubble);
    bubbles.createBubbles(largeBubbles, bubbles.types.largeBubble);
    bubbles.animationQueue();
};