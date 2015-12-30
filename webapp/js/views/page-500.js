var warningIcon,
    warningContainer,
    page500 = {};

page500.colors = {
    red: '#FF0000',
    orange: '#FFA500',
    yellow: '#FFFF00'
};

page500.animateWarningContainer = function(multiplier){
    $(warningContainer).velocity('callout.shake',{
        duration: 1000,
        delay:750*multiplier,
        complete: function(){
            page500.animateWarningContainer(6);
        }
    });
};

page500.animateWarningButton = function(){
    page500.animateWarningContainer(1);
    $(warningIcon).velocity({'color':page500.colors.red},{
        duration: 1000,
        delay:1500,
        loop: true
    });
};

page500.init = function(){
    //variables
    warningIcon = $('.fa-stack-1x');
    warningContainer = $('#container-content').find('p')[0];
    //loading animation
    site.animation.fadeIn('.content',1000,750,0);
    //animation
    setTimeout(function(){
        page500.animateWarningButton();
    }, 750);
};