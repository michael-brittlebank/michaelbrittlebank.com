window.requestAnimationFrame = window.requestAnimationFrame || window.mozRequestAnimationFrame || window.webkitRequestAnimationFrame || window.msRequestAnimationFrame;

var bubblesAnimating = false,
    numberSmallBubbles = 0,
    numberMediumBubbles = 0,
    numberLargeBubbles = 0,
    smallBubbles,
    mediumBubbles,
    largeBubbles,
    bubbles = {};

bubbles.nodeList = [];

bubbles.types = {
    smallBubble: 'small-bubble',
    mediumBubble: 'medium-bubble',
    largeBubble: 'large-bubble'
};

bubbles.resetPath = function(node){
    node.duration = site.helpers.getRandomInt(10, 20);
    node.sinWidth = site.helpers.getRandomInt(100, site.screen.windowWidth/4);
    node.start = null;
    node.progress = null;
    return node;
};

bubbles.createBubbles = function(element, numberOfBubbles, classes){
    var node,
        bubbleContainer = document.getElementById(element),
        currentBubbleNum = 1,
        width,
        height,
        domNode;
    for (var i = 0; i < numberOfBubbles; i++){
        node = {};
        switch(classes){
            case bubbles.types.smallBubble:
                width = height = site.helpers.getRandomInt(5,25);
                numberSmallBubbles = numberOfBubbles;
                break;
            case bubbles.types.mediumBubble:
                width = height = site.helpers.getRandomInt(25,50);
                numberMediumBubbles = numberOfBubbles;
                break;
            case bubbles.types.largeBubble:
                width = height = site.helpers.getRandomInt(50,75);
                numberLargeBubbles = numberOfBubbles;
                break;
        }
        domNode = document.createElement('div');
        domNode.setAttribute('id', 'bubble'+currentBubbleNum);
        domNode.setAttribute('class', classes+' bubble');
        domNode.style.width = width+'px';
        domNode.style.height = height+'px';
        domNode.style.bottom = 0;
        domNode.style.left = 0;
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

bubbles.spawnBubbles = function(element, numberOfSmallBubbles, numberOfMediumBubbles, numberOfLargeBubbles){
    bubbles.createBubbles(element, numberOfSmallBubbles, bubbles.types.smallBubble);
    bubbles.createBubbles(element, numberOfMediumBubbles, bubbles.types.mediumBubble);
    bubbles.createBubbles(element, numberOfLargeBubbles, bubbles.types.largeBubble);
    //bubbles.animationQueue();
};

bubbles.pop = function(){
    //todo, animated destroy "pop"
};

bubbles.controls = {
    startBubbles: function(){
        if(!bubblesAnimating){
            bubblesAnimating = true;
            console.log("started");
        }
    },
    stopBubbles: function(){
        if(bubblesAnimating){
            bubblesAnimating = false;
            console.log("stopped");
        }
    }
};

bubbles.init = function() {
    bubbles.spawnBubbles('content-bubbles',0,0,1);
    //elements
    smallBubbles = $('#smallBubbles');
    mediumBubbles = $('#mediumBubbles');
    largeBubbles = $('#largeBubbles');
    //listeners
    $(smallBubbles).on('change', function(){
        if ($(smallBubbles).val() !== numberSmallBubbles){
            console.log("small bubble update");
            if ($(smallBubbles).val() > numberSmallBubbles){
                //todo, add bubbles and update total
            } else if ($(smallBubbles).val() < numberSmallBubbles){
                //todo, remove bubbles and update total
            }
        }
    });
    $(mediumBubbles).on('change', function(){
        console.log("medium bubble update");
    });
    $(largeBubbles).on('change', function(){
        console.log("large bubble update");
    });
    $('#startBubbles').on('click touch', function(){
        bubbles.controls.startBubbles();
    });
    $('#stopBubbles').on('click touch', function(){
        bubbles.controls.stopBubbles();
    });
};