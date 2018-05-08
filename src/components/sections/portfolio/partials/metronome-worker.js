// https://gist.github.com/nick-thompson/4551106

onmessage = function(e) {
    console.log('Message received from main script', e.data);
    var workerResult = 'Result: play';
    console.log('Posting message back to main script');
    setInterval(
        function() {
            console.log('in interval');
            postMessage(workerResult);
        },
        e.data.interval
    );
};