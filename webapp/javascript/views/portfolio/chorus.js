(function(){

    var that = app.views.portfolio.chorus,
        $ = jQuery;

    //functions
    this.init = function(){

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
    };

}).apply(app.views.portfolio.chorus);