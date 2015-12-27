var bubblesAnimating = false,
    numberSmallBubbles = 0,
    numberMediumBubbles = 0,
    numberLargeBubbles = 0,
    smallBubbles,
    mediumBubbles,
    largeBubbles,
    startBubbles,
    stopBubbles,
    bubbleContainer,
    bubbles = {};

bubbles.nodeList = [];

bubbles.types = {
    smallBubble: 'small-bubble',
    mediumBubble: 'medium-bubble',
    largeBubble: 'large-bubble'
};

bubbles.helpers = {
    updateBubbleCount: function(){
        numberSmallBubbles = $(smallBubbles).val();
        numberMediumBubbles = $(mediumBubbles).val();
        numberLargeBubbles = $(largeBubbles).val();
    }
};

bubbles.animation = {
    moveBubble: function(timestamp){
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
                bubbles.nodeList[i] = bubbles.animation.resetBubble(bubbles.nodeList[i]);
            }
        }
    },
    resetBubble: function(node){
        node.duration = site.helpers.getRandomInt(10, 20);
        node.sinWidth = site.helpers.getRandomInt(100, site.screen.windowWidth/4);
        node.start = null;
        node.progress = null;
        return node;
    },
    destroyBubbles: function(start, end){
        var first = Math.min(start,end),
            last = Math.max(start,end),
            bubblesToRemove;
        if (last > bubbles.nodeList.length){
            last = bubbles.nodeList.length;
        }
        bubblesToRemove = bubbles.nodeList.splice(first, last).reverse();
        for (var i = 0; i < bubblesToRemove.length; i++){
            site.animation.fadeOutAndRemove(bubblesToRemove[i].node,1000,250*i);
        }
    },
    createBubbles: function(numberOfBubbles, classes){
        var node,
            currentBubbleNum = bubbles.nodeList.length,
            width,
            height,
            domNode;
        for (var i = 0; i < numberOfBubbles; i++){
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
            domNode.setAttribute('class', classes+' bubble');
            domNode.style.width = width+'px';
            domNode.style.height = height+'px';
            domNode.style.bottom = 0;
            domNode.style.left = parseInt(Math.random()*100)+'%';
            $(bubbleContainer).append(domNode);
            site.animation.fadeIn(domNode,1000,250*i);
            node.node = domNode;
            bubbles.nodeList.push(bubbles.animation.resetBubble(node));
            currentBubbleNum++;
        }
    }
};

bubbles.controls = {
    startBubbles: function(){
        if(!bubblesAnimating){
            bubblesAnimating = true;
            $(stopBubbles).removeClass('disabled');
            $(startBubbles).addClass('disabled');
            bubbles.animation.createBubbles(numberSmallBubbles, bubbles.types.smallBubble);
            bubbles.animation.createBubbles(numberMediumBubbles, bubbles.types.mediumBubble);
            bubbles.animation.createBubbles(numberLargeBubbles, bubbles.types.largeBubble);
            console.log("started");
        }
    },
    stopBubbles: function(){
        if(bubblesAnimating){
            bubblesAnimating = false;
            $(startBubbles).removeClass('disabled');
            $(stopBubbles).addClass('disabled');
            bubbles.animation.destroyBubbles(0, bubbles.nodeList.length);
            console.log("stopped");
        }
    }
};

bubbles.init = function() {
    //elements
    smallBubbles = $('#smallBubbles');
    mediumBubbles = $('#mediumBubbles');
    largeBubbles = $('#largeBubbles');
    startBubbles = $('#startBubbles');
    stopBubbles = $('#stopBubbles');
    bubbleContainer = $('#content-bubbles');
    //values
    bubbles.helpers.updateBubbleCount();
    //listeners
    $(smallBubbles).on('change', function(){
        if ($(smallBubbles).val() !== numberSmallBubbles){
            console.log("small bubble update");
            bubbles.helpers.updateBubbleCount();
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
    $(startBubbles).on('click touch', function(){
        bubbles.controls.startBubbles();
    });
    $(stopBubbles).on('click touch', function(){
        bubbles.controls.stopBubbles();
    });
};