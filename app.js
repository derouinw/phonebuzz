/**
 * Created by bill on 2/2/16.
 */
var express = require('express');
var bodyParser = require('body-parser');
var app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Get homepage
app.get('/', function(req, res) {
    return res.end('Hello, phonebuzz');
});

// Phase 1
app.get('/phonebuzz', function(req, res) {
    // If we're making the request with the Digits parameter,
    // Twilio has called back with user response
    if (req.query.Digits) {
        var number = parseInt(req.query.Digits);
        var fizzBuzz = '';

        // FizzBuzz
        for (var i = 1; i <= number; i++) {
            var current = '';
            if (i % 3 == 0) current = 'Fizz';
            if (i % 5 == 0) current += 'Buzz';
            if (current == '') current = i.toString();
            fizzBuzz += current + (i == number ? '' : ', ');
        }

        var response = '<?xml version="1.0" encoding="UTF-8"?><Response><Say>' + fizzBuzz + '</Say></Response>';
        res.setHeader('Content-Type', 'text/xml');
        return res.end(response);
    }

    // Otherwise, return default response
    // Return a phone voice prompt for user to enter number
    // Encoded in TwiML
    var response = '<?xml version="1.0" encoding="UTF-8"?><Response><Say>Please enter a number and hit pound</Say><Gather method="GET" /></Response>';
    res.setHeader('Content-Type', 'text/xml');
    return res.end(response);
});

// Start the server
var port = process.env.PORT || 8080;
var server = app.listen(port, function() {
    var host = server.address().address;
    var port = server.address().port;

    console.log('Phonebuzz server listening at http://%s:%s', host, port);
});