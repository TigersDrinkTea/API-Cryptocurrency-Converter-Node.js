//Node modules we have included:
const express = require('express');
const bodyParser = require('body-parser');
const request = require('request');

const app = express();

app.use(bodyParser.urlencoded({
    extended: true
}));

//1.This gets the html for the browser from our server. 
app.get('/', function (req, res) {
    res.sendFile(__dirname + '/index.html')
});


//2. This is the response from the server being posted to the client.
//  Its answering a request, the request api url from the other server is inside.
app.post('/', function (req, res) {

    var crypto = req.body.crypto
    var fiat = req.body.fiat
    var amount = req.body.amount

  // the options var contains the keys and values for the request module.
  // we only HAVE to have url key, the qs key allow us to add parameters we want from the bitcoin server API for our crypto conversion.
   var options = {
       url: 'https://apiv2.bitcoinaverage.com/convert/global',
       method: 'GET',
       qs: {
           from: crypto,
           to: fiat,
           amount: amount,
       }

   }
// the options are the ones we specifically ask for above from the API
    request(options, function (error, response, body) {

        var data = JSON.parse(body);
        var price = data.price;
        var date = data.time;

        res.write('<p>The current date is ' + date + '</p>')
        res.write(' <h1> ' + amount + ' ' + crypto + ' is currently worth: ' + price + ' ' + fiat + '</h1>');
        res.send()
    });
});



app.listen(3000, function () {
    console.log('Server is running on port 3000');
});