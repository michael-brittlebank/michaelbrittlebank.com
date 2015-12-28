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
    msInOneSecond = 1000,
    bubbles = {};

bubbles.types = {
    smallBubble: 'small-bubble',
    mediumBubble: 'medium-bubble',
    largeBubble: 'large-bubble'
};

bubbles.helpers = {
    updateBubbleCount: function(){
        numberSmallBubbles = site.helpers.parseIntFromString($(smallBubbles).val());
        numberMediumBubbles = site.helpers.parseIntFromString($(mediumBubbles).val());
        numberLargeBubbles = site.helpers.parseIntFromString($(largeBubbles).val());
    },
    updateContainerSize: function(){
        containerHeight = $(bubbleContainer).height();
        containerWidth = $(bubbleContainer).width();
    }
};

bubbles.animation = {
    moveBubble: function(element){
        var adjustedHeight = containerHeight+(site.helpers.parseIntFromString($(element.node).height())*2);
        $(element.node).velocity({
                bottom: adjustedHeight
            },
            {
                duration: element.duration,
                progress: function(elements, complete, remainingMs) {
                    var currentTimeInSeconds = remainingMs/msInOneSecond,
                        arcCycleTime = element.duration/msInOneSecond/element.arc.total;
                    if (((element.duration/msInOneSecond)-currentTimeInSeconds)/arcCycleTime >= element.arc.current){
                        //only animate every half cycle
                        var additiveX = element.centerPosition+element.arc.height,
                            subtractiveX = element.centerPosition-element.arc.height,
                            x;
                        if (element.arc.current%2 === 0){
                            x = element.wave === 'sine'?additiveX:subtractiveX;
                        } else {
                            x = element.wave === 'sine'?subtractiveX:additiveX;
                        }
                        element.arc.current++;
                        $(element.node).velocity({left: x+'px'},{
                            duration: element.duration/element.arc.total,
                            queue: false
                        });
                    }
                },
                complete: function(){
                    bubbles.animation.moveBubble(bubbles.animation.resetBubble(element));
                }
            });
    },
    resetBubble: function(element){
        element.duration = site.helpers.getRandomInt(10, 20)*msInOneSecond;
        element.arc = {
            height: site.helpers.getRandomInt(100, containerWidth/4),
            current: 0,
            total: site.helpers.getRandomInt(4,8),
            lastAnimation: 0
        };
        element.node.style.bottom = '-'+site.helpers.parseIntFromString($(element.node).height())+'px';
        element.node.style.left = (containerWidth/2)+(parseInt(Math.random())*containerWidth/2)+'px';
        element.centerPosition = site.helpers.parseIntFromString(element.node.style.left);
        $(element.node).velocity('stop');
        return element;
    },
    destroyBubbleHelper: function(numberToRemove, bubbleList){
        var bubblesToRemove,
            first,
            last;
        if (numberToRemove >= bubbleList.length){
            last = bubbleList.length;
            first = 0;
        } else {
            last = bubbleList.length;
            first = bubbleList.length-numberToRemove;
        }
        bubblesToRemove = bubbleList.splice(first, last).reverse();
        for (var i = 0; i < bubblesToRemove.length; i++){
            site.animation.fadeOutAndRemove(bubblesToRemove[i].node,msInOneSecond,50*i);
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
            duration:msInOneSecond,
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
            bubbles.helpers.updateBubbleCount();
            var smallDifference = numberSmallBubbles-smallBubbleList.length,
                mediumDifference = numberMediumBubbles-mediumBubbleList.length,
                largeDifference = numberLargeBubbles-largeBubbleList.length;
            if (smallDifference > 0){
                bubbles.animation.createBubbles(smallDifference, bubbles.types.smallBubble);
            } else {
                bubbles.animation.destroyBubbles(Math.abs(smallDifference), bubbles.types.smallBubble);
            }
            if (mediumDifference > 0){
                bubbles.animation.createBubbles(mediumDifference, bubbles.types.mediumBubble);
            } else {
                bubbles.animation.destroyBubbles(Math.abs(mediumDifference), bubbles.types.mediumBubble);
            }
            if (largeDifference > 0){
                bubbles.animation.createBubbles(largeDifference, bubbles.types.largeBubble);
            } else {
                bubbles.animation.destroyBubbles(Math.abs(largeDifference), bubbles.types.largeBubble);
            }
        } else if (!bubblesMoving){
            bubblesMoving = true;
            $(startBubbles).addClass('disabled');
            $(stopBubbles).removeClass('disabled');
            $(clearBubbles).removeClass('disabled');
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
    },
    changeBubbleCount: function(typeOfBubble){
        var difference;
        if (bubblesMoving){
            //otherwise caught by start function
            switch(typeOfBubble){
                case bubbles.types.smallBubble:
                    difference = $(smallBubbles).val()-numberSmallBubbles;
                    break;
                case bubbles.types.mediumBubble:
                    difference = $(mediumBubbles).val()-numberMediumBubbles;
                    break;
                case bubbles.types.largeBubble:
                    difference = $(largeBubbles).val()-numberLargeBubbles;
                    break;
            }
            if (difference !== 0){
                if (difference > 0){
                    bubbles.animation.createBubbles(difference, typeOfBubble);
                } else {
                    bubbles.animation.destroyBubbles(Math.abs(difference), typeOfBubble);
                }
                bubbles.helpers.updateBubbleCount();
            }
        }
    }
};

bubbles.init = function() {
    prettyPrint();
    //elements
    smallBubbles = $('#smallBubbles');
    mediumBubbles = $('#mediumBubbles');
    largeBubbles = $('#largeBubbles');
    startBubbles = $('#startBubbles');
    stopBubbles = $('#stopBubbles');
    clearBubbles = $('#clearBubbles');
    bubbleContainer = $('#bubble-holder');
    //values
    bubbles.helpers.updateContainerSize();
    //listeners
    $(smallBubbles).on('change', function(){
        bubbles.controls.changeBubbleCount(bubbles.types.smallBubble);
    });
    $(mediumBubbles).on('change', function(){
        bubbles.controls.changeBubbleCount(bubbles.types.mediumBubble);
    });
    $(largeBubbles).on('change', function(){
        bubbles.controls.changeBubbleCount(bubbles.types.largeBubble);
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
    $(window).resize(function() {
        bubbles.helpers.updateContainerSize();
    });
};