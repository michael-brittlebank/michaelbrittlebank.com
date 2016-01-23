var modal,
    modalDisplayedAlready = false,
    readingList = {};

readingList.init = function(){
    modal = $('#modal-reading-list');
    $('iframe').iFrameResize({
        checkOrigin: [
            'http://wordpress.mikestumpf.com',
            'http://mikestumpf.dev'
        ]
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