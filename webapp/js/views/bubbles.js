window.requestAnimationFrame = window.requestAnimationFrame || window.mozRequestAnimationFrame || window.webkitRequestAnimationFrame || window.msRequestAnimationFrame;

var bubbles = {};

bubbles.nodeList = [];

bubbles.types = {
    smallBubble: 'small-bubble bubble',
    mediumBubble: 'medium-bubble bubble',
    largeBubble: 'large-bubble bubble'
};

bubbles.resetPath = function(node){
    node.duration = site.helpers.getRandomInt(10, 20);
    node.sinWidth = site.helpers.getRandomInt(100, site.screen.windowWidth/4);
    node.start = null;
    node.progress = null;
    return node;
};

bubbles.createBubbles = function(num, classes){
    var node,
        bubbleContainer = document.getElementById('container-bubbles'),
        currentBubbleNum = 1,
        width,
        height,
        domNode;
    for (var i = 0; i < num; i++){
        node = {};
        switch(classes){
            case bubbles.types.smallBubble:
                width = height = site.helpers.getRandomInt(5,25);
                break;
            case bubbles.types.mediumBubble:
                width = height = site.helpers.getRandomInt(25,50);
                break;
            case bubbles.types.largeBubble:
                width = height = site.helpers.getRandomInt(50,75);
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
    function step(timestamp){
        var offsetModifier = site.screen.windowHeight * 0.1,
            modifiedHeight = site.screen.windowHeight + offsetModifier,
            progress,
            x,
            y;
        for (var i = 0; i < bubbles.nodeList.length; i++){
            if(!bubbles.nodeList[i].start){
                bubbles.nodeList[i].start = timestamp;
            }
            progress = (timestamp - bubbles.nodeList[i].start) / bubbles.nodeList[i].duration / 1000;
            x = progress * modifiedHeight / bubbles.nodeList[i].sinWidth;
            if (i % 2 === 0){
                y = 2 * Math.sin(x);
            } else {
                y = 2 * Math.cos(x);
            }
            bubbles.nodeList[i].node.style.bottom = Math.min(site.screen.windowHeight, (bubbles.nodeList[i].sinWidth * x)- offsetModifier) + 'px';
            bubbles.nodeList[i].node.style.left = site.screen.windowWidth / 2 + (bubbles.nodeList[i].sinWidth * y) + 'px';
            if(progress >= 1){
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