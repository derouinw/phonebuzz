/**
 * Created by bill on 2/2/16.
 */
var express = require('express');
var app = express();

// Get homepage
app.get('/', function(req, res) {
    res.end('Hello, phonebuzz');
});

// Start the server
var PORT = 1337;
var server = app.listen(PORT, function() {
    var host = server.address().address;
    var port = server.address().port;

    console.log('Phonebuzz server listening at http://%s:%s', host, port);
});