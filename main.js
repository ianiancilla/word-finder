//this uses the Datamuse API, findable at https://www.datamuse.com/api/

//declare variables
const inputField = document.querySelector("#input-field");
const wikiField = document.querySelector("#wiki-link")

const urlDatamuseAPI = "https://api.datamuse.com/words?";
const urlWiki = "https://en.wikipedia.org/wiki/";

//jQuery
$(document).ready(()=>{
    $("#search").on("click", getSearch)
    $("#search").on("click", setWikiLink)
    $(".label").on("click", (event) =>{
      $(event.currentTarget).toggleClass("selected")
    })

});

//Core functions
async function getSearch()  {//it sends a request to the API using the content of the input field
    $(".results").show("fast");
    const wordQuery = inputField.value;
    const paramQuery = getCurrentParam();
    const endpoint = urlDatamuseAPI + paramQuery + "=" + wordQuery;
    console.log("Fetching: " + endpoint)
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

//WIP
function setWikiLink () {
  let wikiLink = "";
  if (inputField.value) {
    wikiLink = urlWiki+inputField.value;
    wikiField.href = wikiLink;
  } else {
    wikiLink = "Please add something in the Search field.";
  }
  console.log("Wikipedia link: " + wikiLink);
  wikiField.innerHTML = wikiLink;
  
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
    strResponse = "<br /><br />"+strResponse;
    return strResponse
  }

  function getCurrentParam () {
    var radioButtons = document.querySelectorAll('input[type="radio"]:checked');
    var currentParam = radioButtons.length>0? radioButtons[0].value: null;
    return currentParam;
  }