window.requestAnimationFrame = window.requestAnimationFrame || window.mozRequestAnimationFrame || window.webkitRequestAnimationFrame || window.msRequestAnimationFrame;

var bubbles = {};

bubbles.nodeList = [];

bubbles.types = {
    smallBubble: 'small-bubble bubble',
    mediumBubble: 'medium-bubble bubble',
    largeBubble: 'large-bubble bubble'
};

bubbles.createBubbles = function(num, classes){
    var node,
        bubbleContainer = document.getElementById('bubble-container'),
        currentBubbleNum = 1,
        left,
        bottom,
        width,
        height,
        nodeAttr;
    for (var i = 0; i < num; i++){
        left = site.getRandomInt(0,site.screen.windowWidth);
        bottom = site.getRandomInt(0,site.screen.windowHeight);
        nodeAttr = {};
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
        node = document.createElement('div');
        node.setAttribute('id', 'bubble'+currentBubbleNum);
        node.setAttribute('class', classes);
        node.style.width = width+'px';
        node.style.height = height+'px';
        bubbleContainer.appendChild(node);
        nodeAttr.node = node;
        nodeAttr.duration = site.getRandomInt(10, 18);
        nodeAttr.sinWidth = site.getRandomInt(100, site.screen.windowWidth/4);
        nodeAttr.start = null;
        nodeAttr.progress = null;
        bubbles.nodeList.push(nodeAttr);
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
                bubbles.nodeList[i].start = null;
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