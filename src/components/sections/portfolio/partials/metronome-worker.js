var tickTimeout;
var secondsPerMinute = 60;
var millisecondsPerSecond = 1000;
var interval;

onmessage = function(e) {
    if (e.data.interval === 0) {
        // stop
        clearInterval(tickTimeout);
    } else {
        // set interval
        clearInterval(tickTimeout);
        interval = secondsPerMinute * millisecondsPerSecond / e.data.interval;
        tickTimeout = setInterval(
            function () {
                postMessage('tick');
            },
            interval
        );
    }
};