/* netlify function, available at BASE_URL/api/get_text_openAI  or at BASE_URL/.netlify/functions/get_text_openAI ... edit netlify.toml to set the "nice" routes */

const { Configuration, OpenAIApi } = require("openai");
const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
});

// const axios = require('axios');
const p_modelname = "davinci:ft-playpower-labs:remaining-plato-2022-07-25-12-58-51";
const p_temperature = 0.75;
const p_maxtokens = 150;
// const API_URL = "https://api.openai.com/v1/completions";
// const API_URL_TEST = "http://localhost:8080"  // fake openAI API server -- returns canned response. run mock_server
// const OPENAI_API_KEY = process.env.OPENAI_API_KEY;
// }

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
        var body = JSON.parse(event.body); 
        var user_query = body.query; // the "query" field is defined in frontent
    }
    /* //if (~TRUEAPI) {
        call_object = {
        url: API_URL,  // API_URL or API_URL_TEST
        method: 'POST', 
        headers: {"Authorization" : `Bearer ${OPENAI_API_KEY}`},
        params: {
            prompt: user_query,
            temperature: p_temperature, 
            max_tokens: p_maxtokens, 
            model: p_modelname, 
            stop: "####"},
        };
        console.log(call_object);
        var api_response = await axios(call_object); // ERROR THROWN HERE -- TypeError: Cannot read properties of undefined (reading 'join')
        //console.log(api_response.data.choices[0].text); // took almost 2 hours to figure this out!
    // } */
    
    // Uncomment the API call when everything else is ready
    
    const openai = new OpenAIApi(configuration);
    var api_response = await openai.createCompletion({
        model: p_modelname,
        prompt: user_query,
        max_tokens: p_maxtokens,
        temperature: p_temperature,
        stop: "####",
    });
    console.log(api_response.data.choices[0].text);    
    return {
        statusCode: 200,
        body: api_response.data.choices[0].text
        // body: "API response to be populated here" // for development during the Airtable stuff
    }
}