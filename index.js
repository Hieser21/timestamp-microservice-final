/**
 * FreeCodeCamp Timestamp microservice
 * Receive a string parameter and gives a JSON with unix and natural date format
 * @author Lior Chamla
 */
const express = require('express');
const app = express();
const path = require('path');
// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionsSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html



// your first API endpoint... 
app.get("/api/hello", function (req, res) {
  res.json({greeting: 'hello API'});
});


// returning current date and time if empty... 
app.get("/api/:date?/", function (req, res) {
  res.json({'unix': Date.now(), 'utc': Date()});
});

// returning current date and time accepting either unix or valid date, or error otherwise... 
app.get("/api/:date?/", function (req, res) {
  res.json({'unix': Date.now(), 'utc': Date()});
});

app.get("/api/:date?/:date", (req, res) => {
  let dateString = req.params.date;

  if (!isNaN(Date.parse(dateString))) {
    let dateObject = new Date(dateString);
    res.json({ unix: dateObject.valueOf(), utc: dateObject.toUTCString() });
  } else if (/\d{5,}/.test(dateString)) {
      let dateInt = parseInt(dateString);
      res.json({ unix: dateInt, utc: new Date(dateInt).toUTCString() });
  } else {
    res.json({ error: "Invalid Date" });
  }

});
let responseObject = {}
app.get('/api/:date?', (request, response) => {
  responseObject['unix'] = new Date().getTime()
  responseObject['utc'] = new Date().toUTCString()
  
  response.json(responseObject)
})
// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});