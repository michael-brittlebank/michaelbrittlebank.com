var tickTimeout,
    secondsPerMinute = 60,
    millisecondsPerSecond = 1000,
    interval = 0,
    tick = 0,
    startingTime = 0,
    executionTime = 0,
    timeDifference = 0;

onmessage = function(e) {
    if (e.data.interval === 0) {
        // stop
        resetWorker();
    } else {
        // set interval
        resetWorker();
        startingTime = new Date().getTime();
        interval = secondsPerMinute * millisecondsPerSecond / e.data.interval;
        // send initial message to start metronome
        postMessage({
            tick: tick++,
            difference: timeDifference
        });
        tickTimeout = setTimeout(
            function () {
                tickTimer(interval);
            },
            interval
        );
    }
};

function resetWorker() {
    clearTimeout(tickTimeout);
    interval = 0;
    tick = 0;
    startingTime = 0;
    executionTime = 0;
    timeDifference = 0;
}

function tickTimer(interval) {
    executionTime += interval;
    timeDifference = (new Date().getTime() - startingTime) - executionTime;
    postMessage({
        tick: tick++,
        difference: timeDifference
    });
    tickTimeout = setTimeout(
        function () {
            tickTimer(interval);
        },
        interval - timeDifference
    );
}