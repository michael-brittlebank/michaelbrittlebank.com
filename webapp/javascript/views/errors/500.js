(function(){

    var that = app.views.error500,
        $ = jQuery,
        animations = app.animations,
        warningIcon,
        warningContainer,
        colors = {
            red: '#FF0000',
            orange: '#FFA500',
            yellow: '#FFFF00'
        };

    function animateWarningContainer(multiplier){
        $(warningContainer).velocity('callout.shake',{
            duration: 1000,
            delay:750*multiplier,
            complete: function(){
                animateWarningContainer(6);
            }
        });
    }

    function animateWarningButton(){
        animateWarningContainer(1);
        $(warningIcon).velocity({'color':colors.red},{
            duration: 1000,
            delay:1500,
            loop: true
        });
    }

    this.init = function(){
        if($('#page-error-500').length > 0) {
            //variables
            warningIcon = $('.fa-stack-1x');
            warningContainer = $('#container-warning').find('p')[0];
            //animation
            setTimeout(function () {
                animateWarningButton();
            }, 750);
        }
    };

}).apply(app.views.error500);