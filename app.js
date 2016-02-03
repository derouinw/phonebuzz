/**
 * Created by bill on 2/2/16.
 */
var express = require('express');
var app = express();

// Get homepage
app.get('/', function(req, res) {
    res.end('Hello, phonebuzz');
});

// Phase 1
app.get('/phonebuzz', function(req, res) {
    // Return a phone voice prompt for user to enter number
    // Encoded in TwiML
    var response = '<?xml version="1.0" encoding="UTF-8"?><Response><Say>Please enter a number</Say></Response>';
    res.end(response);
});

// Start the server
var port = process.env.PORT || 8080;
var server = app.listen(port, function() {
    var host = server.address().address;
    var port = server.address().port;

    console.log('Phonebuzz server listening at http://%s:%s', host, port);
});