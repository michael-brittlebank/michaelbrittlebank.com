(function(){

    var that = app.mediaQueries,
        tabletBreakpoint = 768,//match sass file
        desktopBreakpoint = 1024;

    //core
    this.getWindowWidth = function(){
        //http://stackoverflow.com/questions/1248081/get-the-browser-viewport-dimensions-with-javascript
        return Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
    };

    this.getWindowHeight = function(){
        return Math.max(document.documentElement.clientHeight, window.innerHeight || 0);
    };

    //media queries
    this.isMobile = function(){
        return that.getWindowWidth() < tabletBreakpoint;
    };

    this.isTablet = function(){
        return that.getWindowWidth() >= tabletBreakpoint && that.getWindowWidth() < desktopBreakpoint;
    };

    this.isDesktop = function(){
        return that.getWindowWidth() >= desktopBreakpoint;
    };

    this.getTabletBreakpoint = function(){
        return tabletBreakpoint;
    };
    
    this.getDesktopBreakpoint = function(){
        return desktopBreakpoint;
    };

}).apply(app.mediaQueries);