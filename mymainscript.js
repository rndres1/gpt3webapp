// button click events to drive the whole functionality

/* buttonA: submit button for the search bar
tasks: 
1. get the text from input field and make POST request to /.netlify/functions/get_text_openAI
2. disable the text field
3. "show" (unhide) the rest of the elements (the result text, survey form with 4 rating-scales and the second submit button)
*/


function button1_function() {
    // alert("Button 1 clicked handled by mymainscript.js")
    document.getElementById("hidden1").style.display = "inline";
    
    //send query to BASE_URL/.netlify/functions/
    api_url = window.location.origin + "/.netlify/functions/get_text_openAI";
    let xhr = new XMLHttpRequest();
    xhr.open("POST", api_url, true); // true indicates it should be synchronous function
    xhr.setRequestHeader("Accept", "application/json");
    xhr.setRequestHeader("Content-Type", "application/json");
    
    xhr.onload = function () {
      document.getElementById("changedWithJS").innerHTML = xhr.responseText;
      var form = document.getElementById("form1");
      var elements = form.elements;
      for (var i = 0, len = elements.length; i < len; ++i) {
          elements[i].readOnly = true; }
    }

    let POSTdata = `{"query": "${document.getElementById("text1").value}"}`;
    xhr.send(POSTdata);
}

/* buttonB: submit button for saving the data
tasks
1. call /.netlify/functions/save_survey with all the data
(the results of BOTH the forms (input query and survey), plus the text div containing GPT-3 return)
*/

function button2_function() {
  //alert("button2 clicked")
  api_url = window.location.origin + "/.netlify/functions/save_survey";
  let xhr = new XMLHttpRequest();
  xhr.open("POST", api_url, true); // true indicates it should be synchronous function
  xhr.setRequestHeader("Accept", "application/json");
  xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
  xhr.onload = function() {
    window.location.href = "./thankyou.html";
  }; // nothing to do with the response value of "OK"
  
  //ipaddress = 

  let POSTdata = `{"user_email": "${document.getElementById("user_email").value}",
                    "rating1": "${document.getElementById("user_rating1").value}",
                    "rating2": "${document.getElementById("user_rating2").value}",
                    "rating3": "${document.getElementById("user_rating3").value}",
                    "rating4": "${document.getElementById("user_rating4").value}",
                    "GPT3_text": "${document.getElementById("changedWithJS").innerHTML}",
                    "query": "${document.getElementById("text1").value}",
                    "useragent": "${navigator.userAgent}"
                  }`

  xhr.send(POSTdata)

}