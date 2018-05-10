var tickTimeout;
var secondsPerMinute = 60;
var millisecondsPerSecond = 1000;
var interval;
var tick = 0;
var startingTime;

onmessage = function(e) {
    if (e.data.interval === 0) {
        // stop
        tick = 0;
        clearInterval(tickTimeout);
    } else {
        // set interval
        clearInterval(tickTimeout);
        startingTime = new Date();
        interval = secondsPerMinute * millisecondsPerSecond / e.data.interval;
        tickTimeout = setInterval(
            function () {
                // var executionTime = new Date();
                // console.log('interval', interval, executionTime - startingTime);
                // startingTime = executionTime;
                postMessage(tick++);
            },
            interval
        );
    }
};