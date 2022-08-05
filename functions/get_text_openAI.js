/* netlify function, available at BASE_URL/api/get_text_openAI ... through a URL routing in netlify.toml config */

const axios = require('axios');
const API_URL_TEST = "http://localhost:8080"  // mock openAI API server -- returns canned response
const API_REAL = ""
const OPENAI_API_KEY = 

exports.handler = async event => {
    // https://stackoverflow.com/a/72026511
    if (event.httpMethod !== 'POST') {
        return {
            statusCode: 501,
            body: 'GET IS NOT ALLOWED HERE',
            headers: {'content-type': 'application/json', 'Allow': 'POST'}
        }
    }
    if (event.body) {
        var body = JSON.parse(event.body)
    }

    retstr = "Your question was \"" + body.query + "\". OpenAI response to be populated here. A joke follows:\n"
    
    const options = {
        method: 'GET',
        url: API_URL_TEST,
        headers: {
            "Accept": "application/json"
        }
    };

/* 
    // THE ACTUAL STUFF -- CALL API AND GET THE RESPONSE
    var rdata_json;
    axios.request(options).then(function (response) {
        //console.log(response.data);
        rdata_json = JSON.parse(response.data);
        console.log(rdata_json);
    }).catch(function (error) {
        console.error(error);
    });
*/
    
    return {
        statusCode: 200,
        body: retstr,
    }
}

/*
    return {
        statusCode: 200,
        body: retstr,
    }
*/