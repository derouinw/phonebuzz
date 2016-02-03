/**
 * Created by bill on 2/2/16.
 */
var express = require('express');
var bodyParser = require('body-parser');
var twilio = require('twilio');
var app = express();

app.use(bodyParser.urlencoded({ extended: true }));

// Get homepage
app.get('/', function(req, res) {
    return res.end('Hello, phonebuzz');
});

// Phase 1
app.post('/phonebuzz', function(req, res) {
    // First, validate the Twilio request
    if (!twilio.validateExpressRequest(req, '17e35d0f81515bc06b0c36c6e25cccb3')) {
        return res.status(403).end('Twilio authentication failed.');
    }

    // If we're making the request with the Digits parameter,
    // Twilio has called back with user response
    if (req.body.Digits) {
        var number = parseInt(req.body.Digits);
        var fizzBuzz = '';

        // FizzBuzz
        for (var i = 1; i <= number; i++) {
            var current = '';
            if (i % 3 == 0) current = 'Fizz';
            if (i % 5 == 0) current += 'Buzz';
            if (current == '') current = i.toString();
            fizzBuzz += current + (i == number ? '' : ', ');
        }

        var response = twilio.TwimlResponse();
        response.say(fizzBuzz);
        res.setHeader('Content-Type', 'text/xml');
        return res.end(response.toString());
    }

    // Otherwise, return default response
    // Return a phone voice prompt for user to enter number
    // Encoded in TwiML
    var response = new twilio.TwimlResponse();
    response.say('Please enter a number and hit pound')
            .gather();

    res.setHeader('Content-Type', 'text/xml');
    return res.end(response.toString());
});

// Start the server
var port = process.env.PORT || 8080;
var server = app.listen(port, function() {
    var host = server.address().address;
    var port = server.address().port;

    console.log('Phonebuzz server listening at http://%s:%s', host, port);
});