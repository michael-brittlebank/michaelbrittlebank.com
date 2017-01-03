(function(){

    var that = app.views.portfolio.bubbles,
        $ = jQuery,
        helpers = app.helpers,
        smallBubblesInput,
        mediumBubblesInput,
        largeBubblesInput,
        startBubblesControl,
        stopBubblesControl,
        clearBubblesControl,
        bubblesCreated = false,
        bubblesMoving = false,
        numberSmallBubbles = 0,
        numberMediumBubbles = 0,
        numberLargeBubbles = 0,
        bubbleContainer,
        smallBubbleList = [],
        mediumBubbleList = [],
        largeBubbleList = [],
        containerHeight,
        containerWidth,
        msInOneSecond = 1000,
        types = {
            smallBubble: 'small-bubble',
            mediumBubble: 'medium-bubble',
            largeBubble: 'large-bubble'
        };

//animations
    function moveBubble(element){
        var adjustedHeight = containerHeight+(helpers.parseIntFromString($(element.node).height())*2);
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
                    if (bubblesCreated) {
                        //only reset if bubbles have not been cleared
                        moveBubble(resetBubble(element));
                    }
                }
            });
    }

    function resetBubble(element){
        element.duration = helpers.getRandomInt(10, 20)*msInOneSecond;
        element.arc = {
            height: helpers.getRandomInt(100, containerWidth/4),
            current: 0,
            total: helpers.getRandomInt(4,8),
            lastAnimation: 0
        };
        element.node.style.bottom = '-'+helpers.parseIntFromString($(element.node).height())+'px';
        element.node.style.left = (containerWidth/2)+(parseInt(Math.random())*containerWidth/2)+'px';
        element.centerPosition = helpers.parseIntFromString(element.node.style.left);
        $(element.node).velocity('stop',true);
        return element;
    }

    function destroyBubbleHelper(numberToRemove, bubbleList){
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
        _.each(bubblesToRemove, function(entry, index){
            $(entry.node).velocity({opacity: 0, visibility: 'hidden'}, {
                duration: msInOneSecond,
                delay: 50 * index,
                queue: false,
                complete: function (elements) {
                    $(elements).velocity('stop',true).remove();
                }
            });
        });
        return bubbleList;
    }

    function destroyBubbles(numberToRemove, typeOfBubble){
        if (numberToRemove > 0) {
            switch (typeOfBubble) {
                case types.smallBubble:
                    smallBubbleList = destroyBubbleHelper(numberToRemove, smallBubbleList);
                    break;
                case types.mediumBubble:
                    mediumBubbleList = destroyBubbleHelper(numberToRemove, mediumBubbleList);
                    break;
                case types.largeBubble:
                    largeBubbleList = destroyBubbleHelper(numberToRemove, largeBubbleList);
                    break;
            }
        }
    }

    function createBubbleHelper(element, delayMultiple){
        $(element.node).css({visibility:'visible'}).velocity({opacity: 0.4},{
            duration:msInOneSecond,
            delay:250*delayMultiple,
            complete: function(){
                moveBubble(element);
            }
        });
        return element;
    }

    function createBubbles(numberOfBubbles, typeOfBubble){
        var node,
            currentBubbleNum,
            width,
            height,
            domNode;
        for (var i = 0; i < numberOfBubbles; i++){
            node = {};
            switch(typeOfBubble){
                case types.smallBubble:
                    width = height = helpers.getRandomInt(5,25);
                    currentBubbleNum = smallBubbleList.length+1;
                    break;
                case types.mediumBubble:
                    width = height = helpers.getRandomInt(25,50);
                    currentBubbleNum = mediumBubbleList.length+1;
                    break;
                case types.largeBubble:
                    width = height = helpers.getRandomInt(50,75);
                    currentBubbleNum = largeBubbleList.length+1;
                    break;
            }
            domNode = document.createElement('div');
            domNode.setAttribute('id', typeOfBubble+'-'+currentBubbleNum);
            domNode.setAttribute('class', typeOfBubble+' bubble');
            domNode.style.width = width+'px';
            domNode.style.height = height+'px';
            bubbleContainer.append(domNode);
            node.node = domNode;
            node.type = typeOfBubble;
            if (currentBubbleNum%2 === 0){
                node.wave = 'sine';
            } else {
                node.wave = 'cosine';
            }
            switch(node.type){
                case types.smallBubble:
                    smallBubbleList.push(createBubbleHelper(resetBubble(node), i));
                    break;
                case types.mediumBubble:
                    mediumBubbleList.push(createBubbleHelper(resetBubble(node), i));
                    break;
                case types.largeBubble:
                    largeBubbleList.push(createBubbleHelper(resetBubble(node), i));
                    break;
            }
            currentBubbleNum++;
        }
    }

    function stopBubblesAnimation(bubbleList){
        bubbleList.forEach(function(element){
            $(element.node).velocity('stop',true);
        });
    }

    function startBubblesAnimation(bubbleList){
        bubbleList.forEach(function(element){
            moveBubble(element);
        });
    }

//helpers
    function updateBubbleCount(){
        numberSmallBubbles = helpers.parseIntFromString(smallBubblesInput.val());
        numberMediumBubbles = helpers.parseIntFromString(mediumBubblesInput.val());
        numberLargeBubbles = helpers.parseIntFromString(largeBubblesInput.val());
    }

    function updateContainerSize(){
        containerHeight = bubbleContainer.height();
        containerWidth = bubbleContainer.width();
    }

//controls
    function startBubblesHandler(element){
        if (!element.hasClass(helpers.disabledClass)) {
            if (!bubblesCreated) {
                bubblesCreated = true;
                bubblesMoving = true;
                startBubblesControl.addClass(helpers.disabledClass);
                stopBubblesControl.removeClass(helpers.disabledClass);
                clearBubblesControl.removeClass(helpers.disabledClass);
                updateBubbleCount();
                var smallDifference = numberSmallBubbles - smallBubbleList.length,
                    mediumDifference = numberMediumBubbles - mediumBubbleList.length,
                    largeDifference = numberLargeBubbles - largeBubbleList.length;
                if (smallDifference > 0) {
                    createBubbles(smallDifference, types.smallBubble);
                } else {
                    destroyBubbles(Math.abs(smallDifference), types.smallBubble);
                }
                if (mediumDifference > 0) {
                    createBubbles(mediumDifference, types.mediumBubble);
                } else {
                    destroyBubbles(Math.abs(mediumDifference), types.mediumBubble);
                }
                if (largeDifference > 0) {
                    createBubbles(largeDifference, types.largeBubble);
                } else {
                    destroyBubbles(Math.abs(largeDifference), types.largeBubble);
                }
            } else if (!bubblesMoving) {
                bubblesMoving = true;
                startBubblesControl.addClass(helpers.disabledClass);
                stopBubblesControl.removeClass(helpers.disabledClass);
                clearBubblesControl.removeClass(helpers.disabledClass);
                startBubblesAnimation(smallBubbleList.concat(mediumBubbleList, largeBubbleList));
            }
        }
    }

    function stopBubblesHandler(element){
        if (!element.hasClass(helpers.disabledClass)) {
            if (bubblesMoving) {
                bubblesMoving = false;
                stopBubblesControl.addClass(helpers.disabledClass);
                startBubblesControl.removeClass(helpers.disabledClass);
                stopBubblesAnimation(smallBubbleList.concat(mediumBubbleList, largeBubbleList));
            }
        }
    }

    function clearBubblesHandler(element) {
        if (!element.hasClass(helpers.disabledClass)) {
            var animationDelay = 55,
                clearBubbleInterval,
                doubleChecked = false;//ms
            bubblesCreated = false;
            bubblesMoving = false;
            stopBubblesControl.addClass(helpers.disabledClass);
            clearBubblesControl.addClass(helpers.disabledClass);
            startBubblesControl.removeClass(helpers.disabledClass);
            destroyBubbles(smallBubbleList.length, types.smallBubble);
            destroyBubbles(mediumBubbleList.length, types.mediumBubble);
            destroyBubbles(largeBubbleList.length, types.largeBubble);
            clearBubbleInterval = setInterval(function () {
                if (bubbleContainer.children().length > 0) {
                    destroyBubbleHelper(bubbleContainer.children().length, bubbleContainer.children());
                } else {
                    if (doubleChecked) {
                        clearInterval(clearBubbleInterval);
                    } else {
                        doubleChecked = true;
                    }
                }
            }, bubbleContainer.children().length * animationDelay);
        }
    }

    function changeBubbleCount(typeOfBubble){
        var difference;
        if (bubblesMoving){
            //otherwise caught by start function
            switch(typeOfBubble){
                case types.smallBubble:
                    difference = smallBubblesInput.val()-numberSmallBubbles;
                    break;
                case types.mediumBubble:
                    difference = mediumBubblesInput.val()-numberMediumBubbles;
                    break;
                case types.largeBubble:
                    difference = largeBubblesInput.val()-numberLargeBubbles;
                    break;
            }
            if (difference !== 0){
                if (difference > 0){
                    createBubbles(difference, typeOfBubble);
                } else {
                    destroyBubbles(Math.abs(difference), typeOfBubble);
                }
                updateBubbleCount();
            }
        }
    }

    this.init = function() {
        if ($('#portfolio-bubbles').length > 0) {
            //variables
            smallBubblesInput = $('#bubbles-input-small');
            mediumBubblesInput = $('#bubbles-input-medium');
            largeBubblesInput = $('#bubbles-input-large');
            startBubblesControl = $('#bubbles-control-start');
            stopBubblesControl = $('#bubbles-control-stop');
            clearBubblesControl = $('#bubbles-control-clear');
            bubbleContainer = $('#bubbles-container');

            //functions
            updateContainerSize();
            prettyPrint();

            //listeners
            smallBubblesInput.on('change', function () {
                changeBubbleCount(types.smallBubble);
            });

            mediumBubblesInput.on('change', function () {
                changeBubbleCount(types.mediumBubble);
            });

            largeBubblesInput.on('change', function () {
                changeBubbleCount(types.largeBubble);
            });

            startBubblesControl.on('click', function () {
                startBubblesHandler($(this));
            });

            stopBubblesControl.on('click', function () {
                stopBubblesHandler($(this));
            });

            clearBubblesControl.on('click', function () {
                clearBubblesHandler($(this));
            });

            $(window).resize(function () {
                updateContainerSize();
            });
        }
    };

}).apply(app.views.portfolio.bubbles);