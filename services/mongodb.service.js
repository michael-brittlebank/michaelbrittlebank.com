var mongoClient = require('mongodb').MongoClient,
    assert = require('assert'),
    config = require('../config/config');

// Connection URL
var url = config.mongodb.endpoint;
// Use connect method to connect to the Server
mongoClient.connect(url, function(err, db) {
    assert.equal(null, err);
    console.log("Connected correctly to server");

    db.close();
});