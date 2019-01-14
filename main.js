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
    const paramQuery = "rel_syn="; //DA MODIFICARE
    const endpoint = url + paramQuery + wordQuery;
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
    if (strResponse === ".") {//STILL NEEDS TO BE CHANGED TO STH A BIT MORE ELEGANT, O THAT IT DOES NOT THE forEach ON AN EMPTY ANSWER.
      strResponse = "Sorry, there were no matching results."
    }
    return strResponse
  }