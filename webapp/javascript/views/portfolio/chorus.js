(function(){

    var that = app.views.portfolio.chorus,
        $ = jQuery,
        animations = app.animations,
        helpers = app.helpers,
        activeClass = helpers.activeClass,
        chorusTabs,
        currentActiveTab,
        chorusMainContainer;

    function changeChorusTab(element){
        var containerId = element.attr('data-id'),
            containerHeight = element.attr('data-height');
        if(containerId && containerId.length > 0 && currentActiveTab !== containerId){
            chorusTabs.removeClass(activeClass);
            element.addClass(activeClass);
            animations.fadeOut($('#'+currentActiveTab))
                .then(function(element){
                    $(element).css({display: 'none'});
                    currentActiveTab = containerId;
                    var newActiveTab = $('#'+currentActiveTab);
                    newActiveTab.css({display: 'block'});
                    animations.animateElement(chorusMainContainer, {properties: {
                        height: containerHeight+'px'
                    }});
                    animations.fadeIn(newActiveTab);
                });
        }
    }

    //functions
    this.init = function(){
        if($('#portfolio-chorus').length > 0){

            //variables
            chorusTabs = $('.chorus-tab');
            currentActiveTab = $('.chorus-tab.active').attr('data-id');
            chorusMainContainer = $('#chorus-main-container');

            //functions
            prettyPrint();

            //chorus init
            var guitarConfig = {
                    layoutInstrument: ['guitar'],
                    chorusDebug:'console'
                },
                pianoConfig = {
                    layoutInstrument: ['piano'],
                    chorusDebug:'console'
                },
                bassConfig = {
                    layoutInstrument: ['bass'],
                    chorusDebug:'console'
                };
            chorus.init('chorus-guitar', guitarConfig);
            chorus.init('chorus-piano', pianoConfig);
            chorus.init('chorus-bass', bassConfig);

            //listeners
            $(document).on('chorusSearchComplete', function(e) {
                setTimeout(function(){
                    chorus.populateLists('results-scales','results-chords');
                    //open modal
                    $('.results-container').each(function(){
                        if(!$(this).is(":visible")){
                            $('a[aria-controls='+$(this).attr('id')+']').click();
                        }
                    });
                },100);
            });

            chorusTabs.on('click',function(){
                changeChorusTab($(this));
            });
        }
    };

}).apply(app.views.portfolio.chorus);