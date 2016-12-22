(function(){

    var that = app.helpers,
        $ = jQuery;

   this.getRandomInt = function (min, max) {
       //http://stackoverflow.com/questions/1527803/generating-random-numbers-in-javascript-in-a-specific-range
       return Math.floor(Math.random() * (max - min)) + min;
    };

    this.getRandomElement = function(array){
        return array[that.getRandomInt(0, array.length-1)];
    };
    
    this.shuffleArray = function(array) {
        //http://stackoverflow.com/questions/2450954/how-to-randomize-shuffle-a-javascript-array
        for (var i = array.length - 1; i > 0; i--) {
            var j = Math.floor(Math.random() * (i + 1));
            var temp = array[i];
            array[i] = array[j];
            array[j] = temp;
        }
        return array;
    };
    
    this.parseIntFromString = function(string){
        //http://stackoverflow.com/questions/395163/get-css-top-value-as-number-not-as-string
        return parseInt(string, 10);
    };
    
}).apply(app.helpers);