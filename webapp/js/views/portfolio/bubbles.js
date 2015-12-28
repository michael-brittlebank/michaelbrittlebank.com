var bubblesCreated = false,
    bubblesMoving = false,
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
    containerHeight,
    containerWidth,
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
    moveBubble: function(element){
        $(element.node).velocity({
                bottom: containerHeight
            },
            {
                duration: element.duration,
                progress: function(elements, complete, remainingMs, start, tweenValue) {
                    var msInOneSecond = 1000,
                        currentTimeInSeconds = remainingMs/msInOneSecond,
                        waitTimeInSeconds = 1;
                    //console.log((complete * 100) + "%");
                    //console.log(currentTimeInSeconds + " sec remaining!");
                    //site.helpers.logger('element.lastAnimation',element.lastAnimation);
                    if (Math.abs(currentTimeInSeconds-element.lastAnimation) >= waitTimeInSeconds){
                        //only animate every second
                        element.lastAnimation = currentTimeInSeconds;
                        var x = complete * 100 * containerWidth / element.arcHeight,
                            y;
                        if (element.wave === 'sine'){
                            y = Math.sin(x)>0?element.arcHeight:-element.arcHeight;
                        } else {
                            y = Math.cos(x)>0?element.arcHeight:-element.arcHeight;
                        }
                        site.helpers.logger('x',x);
                        site.helpers.logger('y',y);
                        site.helpers.logger('element.arcHeight',element.arcHeight);
                        $(element.node).velocity({left: y+'px'},{duration: waitTimeInSeconds*msInOneSecond, queue: false});
                    }
                }
            });
    },
    resetBubble: function(element){
        element.duration = site.helpers.getRandomInt(10, 20)*1000;
        element.arcHeight = site.helpers.getRandomInt(100, containerWidth/4);
        element.lastAnimation = 0;
        $(element.node).velocity('stop');
        return element;
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
            $(bubblesToRemove[i].node).velocity('stop');
            site.animation.fadeOutAndRemove(bubblesToRemove[i].node,1000,250*i);
        }
        return bubbleList;
    },
    destroyBubbles: function(numberToRemove, typeOfBubble){
        if (numberToRemove > 0) {
            switch (typeOfBubble) {
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
        }
    },
    createBubbleHelper: function(element, delayMultiple){
        $(element.node).css({visibility:'visible'}).velocity({opacity: 0.4},{
            duration:1000,
            delay:250*delayMultiple,
            complete: function(){
                bubbles.animation.startBubbleHelper(element);
            }
        });
        return element;
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
                    currentBubbleNum = smallBubbleList.length+1;
                    break;
                case bubbles.types.mediumBubble:
                    width = height = site.helpers.getRandomInt(25,50);
                    currentBubbleNum = mediumBubbleList.length+1;
                    break;
                case bubbles.types.largeBubble:
                    width = height = site.helpers.getRandomInt(50,75);
                    currentBubbleNum = largeBubbleList.length+1;
                    break;
            }
            domNode = document.createElement('div');
            domNode.setAttribute('id', typeOfBubble+'-'+currentBubbleNum);
            domNode.setAttribute('class', typeOfBubble+' bubble');
            domNode.style.width = width+'px';
            domNode.style.height = height+'px';
            domNode.style.bottom = 0;
            domNode.style.left = containerWidth*parseInt(Math.random())+'px';
            $(bubbleContainer).append(domNode);
            node.node = domNode;
            node.type = typeOfBubble;
            if (currentBubbleNum%2 === 0){
                node.wave = 'sine';
            } else {
                node.wave = 'cosine';
            }
            switch(node.type){
                case bubbles.types.smallBubble:
                    smallBubbleList.push(bubbles.animation.createBubbleHelper(bubbles.animation.resetBubble(node), i));
                    break;
                case bubbles.types.mediumBubble:
                    mediumBubbleList.push(bubbles.animation.createBubbleHelper(bubbles.animation.resetBubble(node), i));
                    break;
                case bubbles.types.largeBubble:
                    largeBubbleList.push(bubbles.animation.createBubbleHelper(bubbles.animation.resetBubble(node), i));
                    break;
            }
            currentBubbleNum++;
        }
    },
    stopBubbles: function(bubbleList){
        bubbleList.forEach(function(element){
            $(element.node).velocity('stop');
        });
    },
    startBubbleHelper: function(element){
        bubbles.animation.moveBubble(element);
    },
    startBubbles: function(bubbleList){
        bubbleList.forEach(function(element){
            bubbles.animation.startBubbleHelper(element);
        });
    }
};

bubbles.controls = {
    startBubbles: function(){
        if(!bubblesCreated){
            bubblesCreated = true;
            bubblesMoving = true;
            $(startBubbles).addClass('disabled');
            $(stopBubbles).removeClass('disabled');
            $(clearBubbles).removeClass('disabled');
            var smallDifference = numberSmallBubbles-smallBubbleList.length,
                mediumDifference = numberMediumBubbles-mediumBubbleList.length,
                largeDifference = numberLargeBubbles-largeBubbleList.length;
            //if (smallDifference > 0){
            //    bubbles.animation.createBubbles(smallDifference, bubbles.types.smallBubble);
            //} else {
            //    bubbles.animation.destroyBubbles(Math.abs(smallDifference), bubbles.types.smallBubble);
            //}
            //if (mediumDifference > 0){
            //    bubbles.animation.createBubbles(mediumDifference, bubbles.types.mediumBubble);
            //} else {
            //    bubbles.animation.destroyBubbles(Math.abs(mediumDifference), bubbles.types.mediumBubble);
            //}
            if (largeDifference > 0){
                bubbles.animation.createBubbles(largeDifference, bubbles.types.largeBubble);
            } else {
                bubbles.animation.destroyBubbles(Math.abs(largeDifference), bubbles.types.largeBubble);
            }
        } else if (!bubblesMoving){
            bubbles.animation.startBubbles(smallBubbleList);
            bubbles.animation.startBubbles(mediumBubbleList);
            bubbles.animation.startBubbles(largeBubbleList);
        }
    },
    stopBubbles: function(){
        if(bubblesMoving){
            bubblesMoving = false;
            $(stopBubbles).addClass('disabled');
            $(startBubbles).removeClass('disabled');
            bubbles.animation.stopBubbles(smallBubbleList);
            bubbles.animation.stopBubbles(mediumBubbleList);
            bubbles.animation.stopBubbles(largeBubbleList);
        }
    },
    clearBubbles: function(){
        bubblesCreated = false;
        bubblesMoving = false;
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
    containerHeight = $(bubbleContainer).height();
    containerWidth = $(bubbleContainer).width();
    //values
    bubbles.helpers.updateBubbleCount();
    //listeners
    $(smallBubbles).on('change', function(){
        if ($(smallBubbles).val() !== numberSmallBubbles){
            console.log("small bubble update");
            bubbles.helpers.updateBubbleCount();
            if (bubblesAnimating){
                //otherwise caught by start function
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