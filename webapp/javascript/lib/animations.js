(function(){

    var $ = jQuery,
        that = app.animations;

    this.scrollingToTop = false;

    //default animation function
    this.animateElement = function(element, parameters){
        if (!parameters){
            parameters = {};
        }
        var queue = parameters.hasOwnProperty('queue')?parameters.queue:false,
            complete = parameters.hasOwnProperty('complete') ? parameters.complete:function(){},
            parametersObject = {
                duration: parameters.hasOwnProperty('duration')?parameters.duration:250,
                delay: parameters.hasOwnProperty('delay')?parameters.delay:0,
                easing: parameters.hasOwnProperty('easing')?parameters.easing:'swing',
                complete: function(){
                    try {
                        complete();
                    } catch (error){
                        console.log(error);
                    }
                    return Promise.resolve();
                }
            };
        if (parameters.hasOwnProperty('begin')){
            parametersObject.begin = function () {
                try {
                    parameters.begin();
                } catch (error){
                    console.log(error);
                }
            };
        }
        return new Promise(function(resolve,reject) {
            if (!queue){
                $(element).velocity('stop', true);
            }
            $(element).velocity(parameters.properties, parametersObject);
        });
    };

    //scroll page to top of viewport
    this.scrollToTop = function(){
        return new Promise(function(resolve,reject) {
            $('html').velocity('stop', true).velocity('scroll', {
                duration: 750,
                offset: 0,
                mobileHA: false,
                begin: function () {
                    that.scrollingToTop = true;
                },
                complete: function (elements) {
                    that.scrollingToTop = false;
                    resolve(elements);
                }
            });
        });
    };

    //element fade out helper
    this.fadeOut = function(element, parameters){
        if (!parameters){
            parameters = {};
        }
        parameters.properties = {'opacity': 0};
        return that.animateElement(element, parameters);
    };

    //element fade in helper
    this.fadeIn = function(element, parameters){
        if (!parameters){
            parameters = {};
        }
        var opacity = parameters.hasOwnProperty('opacity')?parameters.opacity:1;
        parameters.properties = {'opacity': opacity};
        return that.animateElement(element, parameters);
    };

}).apply(app.animations);