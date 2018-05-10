// https://gist.github.com/nick-thompson/4551106

var interval;

onmessage = function(e) {
    if (e.data.interval === 0) {
        // stop
        clearInterval(interval);
    } else {
        // set interval
        clearInterval(interval);
        interval = setInterval(
            function () {
                postMessage(e.data.interval);
            },
            e.data.interval
        );
    }
};