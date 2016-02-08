/**
 * Created by bill on 2/2/16.
 */
var http = require('http');
var querystring = require('querystring');
var express = require('express');
var bodyParser = require('body-parser');
var twilio = require('twilio');
var client = require('mongodb').MongoClient;
var ObjectId = require('mongodb').ObjectID;
var app = express();

var db_url = 'mongodb://heroku_rpx78t2v:nvl63gsq9rkrep9207rkqvr44g@ds059195.mongolab.com:59195/heroku_rpx78t2v';

app.use(bodyParser.urlencoded({ extended: true }));

// Get homepage
app.get('/', function(req, res) {

    client.connect(db_url, function(err, db) {
        if (err || db == null) return res.status(400).end('Error connecting to database');

        db.collection('phonebuzz-history').find({}).toArray(function(err, records) {
            if (err) return res.status(400).end('Error connecting to database');

            var history = '<table>' +
                '<tr><td>Call ID</td><td>Time</td><td>Delay</td><td>Number</td><td>Phone</td><td />';

            for (var i = 0; i < records.length; i++) {
                var record = records[i];
                console.log(JSON.stringify(record, 2));
                history += '<tr><td>'+record['_id']+'</td><td>'+record.time+'</td><td>'+record.delay+'</td><td>'+record.number+'</td><td>'+record.phone+'</td>'
            }

            history += '</table>';

            var page =  '<html>' +
                '<body><p>Please enter a phone number</p>' +
                '<form action="phonebuzz2" method="post"><input type="text" name="number"/><br />' +
                '<p>Please enter the number of seconds to wait before calling</p>' +
                '<input type="text" name="delay" value="0" /><br />' +
                '<input type="submit" value="Submit" />' +
                '</form>' +
                history +
                '</body>' +
                '</html>';

            return res.end(page);
        });
    });
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

// Phase 2/3
app.post('/phonebuzz2', function(req, res) {
    if (!req.body.number || !req.body.delay) return res.end();
    var number = req.body.number;
    var delay = parseInt(req.body.delay);

    // Delay the call for the given amount of time
    setTimeout(function() {
        var client = twilio('ACf85225f474f01fb37f35b29c5b27d927','17e35d0f81515bc06b0c36c6e25cccb3');
        client.makeCall({
            to:number,
            from:'+14797558788',
            url:'http://derouinw-phonebuzz.herokuapp.com/phonebuzz'
        }, function(err, call) {
            if (err) return res.status(403).end(err.message);
            else res.end('Call successful');
        });
    }, delay * 1000);

});

// Start the server
var port = process.env.PORT || 8080;
var server = app.listen(port, function() {
    var host = server.address().address;
    var port = server.address().port;

    console.log('Phonebuzz server listening at http://%s:%s', host, port);
});