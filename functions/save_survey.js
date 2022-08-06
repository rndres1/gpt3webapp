/* save the data from survey to Airtable. 
Need a whole backend (Netlify function) function only to hide the Airtable auth key, otherwise could have done it from frontend.
*/

var Airtable = require('airtable');

var APIKEY = process.env.AIRTABLE_AUTH_TOKEN
var base = new Airtable({apiKey: APIKEY}).base('appV38xkLiMA1qeeY');


exports.handler = async event => {
    // https://stackoverflow.com/a/72026511
    if (event.httpMethod !== 'POST') {
        return {
            statusCode: 501,
            body: 'GET IS NOT ALLOWED HERE',
            headers: {'content-type': 'application/json;charset=utf8', 'Allow': 'POST'}
        }
    }

    console.log(event.body);
    if (event.body) {
        var body = JSON.parse(event.body.toString('utf8')); 
    }
        
    var dateObject = new Date(Date.now());
    var date = dateObject.getDate();
    var month = dateObject.getMonth() + 1;
    var year = dateObject.getFullYear();
    var hours = dateObject.getHours();
    var minutes = dateObject.getMinutes();
    var seconds = dateObject.getSeconds();
 
    // prints date & time in YYYY-MM-DD format
    var timestamp = `${year}_${month}_${date}_${hours}_${minutes}_${seconds}`;
    var newData = [
        {
          "fields": {
            "emailID": body.user_email,
            "user_input_query": body.query,
            "GPT3_passage": body.GPT3_text,
            "Rating1": body.rating1,
            "Rating2": body.rating2,
            "Rating3": body.rating3,
            "Rating4": body.rating4,
            "IPaddress": "192.168.0.1",
            "UserAgent": body.useragent,
            "timestamp": timestamp
          }
        }];

    console.log(newData);

    base('respData').create(newData, {typecast: true}, function(err, records) {
        if (err) {
          console.error(err);
          return;
        }
        records.forEach(function (record) {
          console.log(record.getId());
        });
      });


    // not going to check this in frontend
    return {
        statusCode: 200,
        body: "OK"
    }
}