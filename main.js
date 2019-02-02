//this uses the Datamuse API, findable at https://www.datamuse.com/api/

//declare variables
const inputField = document.querySelector("#input-field");
const url = "https://api.datamuse.com/words?";

//jQuery
$(document).ready(()=>{
    $("#search").on("click", getSearch)

});

//WIP functions
async function getSearch()  {//it sends a request to the API using the content of the input field
    const wordQuery = inputField.value;
    console.log("getting the param")
    const paramQuery = getCurrentParam();
    const endpoint = url + paramQuery + "=" + wordQuery;
    console.log("sending fetch for" + endpoint)
    try {
      const response = await fetch(endpoint);
      if (response.ok) {
        const jsonResponse = await response.json();
        $("#result-box").html(renderResponse(jsonResponse))
      }
    } catch(error) {
      console.log(error);
    }
  }

//helper functions
  function renderResponse (respArray) { //used on the json() of a Datamuse response, will return a string composed of the list of words, separated by a comma, ending in a full-stop. If no results are present, it will return a message detailing this.
    let strResponse = "";
    respArray.forEach(element =>{
      strResponse += element.word + ", "
    });
    strResponse = strResponse.substring(0, strResponse.length-2)+"."
    if (strResponse === ".") {//STILL NEEDS TO BE CHANGED TO STH A BIT MORE ELEGANT, SO THAT IT DOES NOT THE forEach ON AN EMPTY ANSWER.
      strResponse = "Sorry, there were no matching results."
    }
    return strResponse
  }

  function getCurrentParam () {
    /*const radioButtons = document.querySelectorAll("radio")
    console.log(radioButtons)
    let currentParam = "";
    console.log("getting param started")
      radioButtons.forEach(button => {
        if (button.checked) {
          currentParam = button.value;
          console.log("button checked is: ")
          console.log(button.value)
        }
      })
    return currentParam;*/
    var radioButtons = document.querySelectorAll('input[type="radio"]:checked');
    var currentParam = radioButtons.length>0? radioButtons[0].value: null;
    console.log("param passed is "+currentParam)
    return currentParam;
  }