var bubblesAnimating = false,
    numberSmallBubbles = 0,
    numberMediumBubbles = 0,
    numberLargeBubbles = 0,
    smallBubbles,
    mediumBubbles,
    largeBubbles,
    startBubbles,
    stopBubbles,
    clearBubbles,
    bubbleContainer,
    smallBubbleList = [],
    mediumBubbleList = [],
    largeBubbleList = [],
    bubbles = {};

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
    //moveBubble: function(timestamp){
    //    var offsetModifier = site.screen.windowHeight * 0.1,
    //        modifiedHeight = site.screen.windowHeight + offsetModifier,
    //        progress,
    //        x,
    //        y;
    //    for (var i = 0; i < smallBubbleList.length; i++){
    //        if(!smallBubbleList[i].start){
    //            smallBubbleList[i].start = timestamp;
    //        }
    //        progress = (timestamp - smallBubbleList[i].start) / smallBubbleList[i].duration / 1000;
    //        x = progress * modifiedHeight / smallBubbleList[i].sinWidth;
    //        if (i % 2 === 0){
    //            y = 2 * Math.sin(x);
    //        } else {
    //            y = 2 * Math.cos(x);
    //        }
    //        smallBubbleList[i].node.style.bottom = Math.min(site.screen.windowHeight, (smallBubbleList[i].sinWidth * x)- offsetModifier) + 'px';
    //        smallBubbleList[i].node.style.left = site.screen.windowWidth / 2 + (smallBubbleList[i].sinWidth * y) + 'px';
    //        if(progress >= 1){
    //            smallBubbleList[i] = bubbles.animation.resetBubble(smallBubbleList[i]);
    //        }
    //    }
    //},
    resetBubble: function(node){
        node.duration = site.helpers.getRandomInt(10, 20);
        node.sinWidth = site.helpers.getRandomInt(100, site.screen.windowWidth/4);
        node.start = null;
        node.progress = null;
        return node;
    },
    destroyBubbleHelper: function(numberToRemove, bubbleList){
        var bubblesToRemove,
            first,
            last;
        if (numberToRemove > bubbleList.length){
            last = bubbleList.length;
            first = 0;
        } else {
            last = bubbleList.length;
            first = bubbleList.length-numberToRemove;
        }
        bubblesToRemove = bubbleList.splice(first, last).reverse();
        for (var i = 0; i < bubblesToRemove.length; i++){
            site.animation.fadeOutAndRemove(bubblesToRemove[i].node,1000,250*i);
        }
        return bubbleList;
    },
    destroyBubbles: function(numberToRemove, typeOfBubble){
        switch(typeOfBubble){
            case bubbles.types.smallBubble:
                smallBubbleList = bubbles.animation.destroyBubbleHelper(numberToRemove, smallBubbleList);
                break;
            case bubbles.types.mediumBubble:
                mediumBubbleList = bubbles.animation.destroyBubbleHelper(numberToRemove, mediumBubbleList);
                break;
            case bubbles.types.largeBubble:
                largeBubbleList = bubbles.animation.destroyBubbleHelper(numberToRemove, largeBubbleList);
                break;
        }
    },
    createBubbles: function(numberOfBubbles, typeOfBubble){
        var node,
            currentBubbleNum,
            width,
            height,
            domNode;
        for (var i = 0; i < numberOfBubbles; i++){
            node = {};
            switch(typeOfBubble){
                case bubbles.types.smallBubble:
                    width = height = site.helpers.getRandomInt(5,25);
                    currentBubbleNum = smallBubbleList.length;
                    break;
                case bubbles.types.mediumBubble:
                    width = height = site.helpers.getRandomInt(25,50);
                    currentBubbleNum = mediumBubbleList.length;
                    break;
                case bubbles.types.largeBubble:
                    width = height = site.helpers.getRandomInt(50,75);
                    currentBubbleNum = largeBubbleList.length;
                    break;
            }
            domNode = document.createElement('div');
            domNode.setAttribute('id', 'bubble'+currentBubbleNum);
            domNode.setAttribute('class', typeOfBubble+' bubble');
            domNode.style.width = width+'px';
            domNode.style.height = height+'px';
            domNode.style.bottom = 0;
            domNode.style.left = parseInt(Math.random()*100)+'%';
            $(bubbleContainer).append(domNode);
            site.animation.fadeIn(domNode,1000,250*i);
            node.node = domNode;
            switch(typeOfBubble){
                case bubbles.types.smallBubble:
                    smallBubbleList.push(bubbles.animation.resetBubble(node));
                    break;
                case bubbles.types.mediumBubble:
                    mediumBubbleList.push(bubbles.animation.resetBubble(node));
                    break;
                case bubbles.types.largeBubble:
                    largeBubbleList.push(bubbles.animation.resetBubble(node));
                    break;
            }
            currentBubbleNum++;
        }
    }
};

bubbles.controls = {
    startBubbles: function(){
        if(!bubblesAnimating){
            bubblesAnimating = true;
            $(stopBubbles).removeClass('disabled');
            $(clearBubbles).removeClass('disabled');
            $(startBubbles).addClass('disabled');
            if (numberSmallBubbles > smallBubbleList.length){
                bubbles.animation.createBubbles(numberSmallBubbles-smallBubbleList.length, bubbles.types.smallBubble);
            } else {
                bubbles.animation.destroyBubbles(smallBubbleList.length-numberSmallBubbles, bubbles.types.smallBubble);
            }
            if (false){
                bubbles.animation.createBubbles(numberMediumBubbles, bubbles.types.mediumBubble);
            }
            if (false){
                bubbles.animation.createBubbles(numberLargeBubbles, bubbles.types.largeBubble);
            }
        }
    },
    stopBubbles: function(){
        if(bubblesAnimating){
            bubblesAnimating = false;
            $(startBubbles).removeClass('disabled');
            $(stopBubbles).addClass('disabled');
            console.log('stopped');
        }
    },
    clearBubbles: function(){
        bubblesAnimating = false;
        $(stopBubbles).addClass('disabled');
        $(clearBubbles).addClass('disabled');
        $(startBubbles).removeClass('disabled');
        bubbles.animation.destroyBubbles(smallBubbleList.length, bubbles.types.smallBubble);
        bubbles.animation.destroyBubbles(mediumBubbleList.length, bubbles.types.mediumBubble);
        bubbles.animation.destroyBubbles(largeBubbleList.length, bubbles.types.largeBubble);
    }
};

bubbles.init = function() {
    //elements
    smallBubbles = $('#smallBubbles');
    mediumBubbles = $('#mediumBubbles');
    largeBubbles = $('#largeBubbles');
    startBubbles = $('#startBubbles');
    stopBubbles = $('#stopBubbles');
    clearBubbles = $('#clearBubbles');
    bubbleContainer = $('#content-bubbles');
    //values
    bubbles.helpers.updateBubbleCount();
    //listeners
    $(smallBubbles).on('change', function(){
        if ($(smallBubbles).val() !== numberSmallBubbles){
            console.log("small bubble update");
            bubbles.helpers.updateBubbleCount();
            if (bubblesAnimating){
                if ($(smallBubbles).val() > numberSmallBubbles){
                    //todo, add bubbles and update total
                } else if ($(smallBubbles).val() < numberSmallBubbles){
                    //todo, remove bubbles and update total
                }
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
    $(clearBubbles).on('click touch', function(){
        bubbles.controls.clearBubbles();
    });
};