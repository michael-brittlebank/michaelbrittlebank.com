var chorus = {};

(function(){

    var tabPanels;

    //functions
    this.init = function(){
        tabPanels = $('.tab-pane');
        site.animation.fadeIn('.page.chorus',750,750,250);
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
        _chorus.init('chorus-guitar', guitarConfig);
        _chorus.init('chorus-piano', pianoConfig);
        _chorus.init('chorus-bass', bassConfig);

        //listeners
        $(document).on('chorusSearchComplete', function(e) {
            setTimeout(function(){
                _chorus.populateLists('results-scales','results-chords');
                //open modal
                $('.results-container').each(function(){
                    if(!$(this).is(":visible")){
                        $('a[aria-controls='+$(this).attr('id')+']').click();
                    }
                });
            },100);
        });
    };

}).apply(chorus);