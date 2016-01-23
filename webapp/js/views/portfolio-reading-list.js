var modal,
    modalDisplayedAlready = false,
    readingList = {};

readingList.init = function(){
    modal = $('#modal-reading-list');
    $('iframe').iFrameResize({
        bodyMargin: 25,
        checkOrigin: [
            'http://wordpress.mikestumpf.com'//,
            //'http://mikestumpf.dev'
            //disable dev url
        ],
        initCallback: function(){
            site.animation.fadeIn('#content-reading-list',1000,500,0);
        }
    });
    if (!Foundation.MediaQuery.atLeast('medium')) {
        setTimeout(function(){
            $(modal).foundation('open');
        }, 1000);
    }
    $(window).on('changed.zf.mediaquery', function(event, name) {
        // name is the name of the breakpoint
        if (name === 'small' && !modalDisplayedAlready){
            $(modal).foundation('open');
            modalDisplayedAlready = true;
        } else {
            $(modal).foundation('close');
        }
    });
};