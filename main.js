//this uses the Datamuse API, findable at https://www.datamuse.com/api/

//declare variables
const inputField = document.querySelector("#input-field");
const wikiField = document.querySelector("#wiki-link")

const urlDatamuseAPI = "https://api.datamuse.com/words?";
const urlWiki = "https://en.wikipedia.org/wiki/";

 //TEXT VARIABLES
 const syn = "Synonims are words having the same or nearly the same meaning as another in the language."
 const ant = "Antonyms are words opposite in meaning to another."
 const ml = "Similar meaning works like a reverse dictionary. Look for a word or expression and find words with a similar meaning."
 const trg = "Triggers are words that are statistically associated with the given word in the same piece of text."
 const spc = "Hypernyms are words with a broader meaning into which words with more specific meanings fall. If you look for 'green', a result will be 'color'."
 const gen = "Hyponyms are words of more specific meaning than a general word you search for. For example, 'spoon' is a hyponym of 'cutlery'."
 const com = "Holonyms are words that indicate the whole that the searched word is a part of. For example, 'body' is a holonym of 'arm'."
 const par = "Meronyms are words that indicate parts of the whole represented by the word searched for. For example, 'arm' is a meronym of 'body'."
 const cns = "Words with matching consonants."
 const rhy = "Words rhyming with the word searched."
 const nry = "Words which have an imperfect rhyme with the word searched."
 const sl = "Results will be words that have a similar pronounciation to the word searched."
 const bga = "Words that frequently follow the one searched in a sentence."
 const bgb = "Words that frequently precede the one searched in a sentence."
 const jjb = "Popular adjectives used to modify the given noun."
 const jja = "Popular nouns modified by the given adjective."
 

//jQuery
$(document).ready(()=>{
    $("#search").on("click", getSearch)
    $("#search").on("click", setWikiLink)

    $("label").prev().on("change", (event) =>{
      if (inputField.value !== "" && $(event.currentTarget).prop("checked") ) {
        getSearch();
        setWikiLink();
        setFooterText($(event.currentTarget).attr("id"))
        console.log($(event.currentTarget).attr("id"))
      }
    })

    $("label").on("mouseover", (event) =>{
      setFooterText($(event.currentTarget).prev().attr("id"))
    })

    $("label").on("mouseout", (event) =>{
      var radioButtons = document.querySelectorAll('input[type="radio"]:checked');
      if (radioButtons.length>0) {
        setFooterText(radioButtons[0].next().attr("id"))
      } else {
        $(".footer").hide();
      }
    })


    // var radioButtons = document.querySelectorAll('input[type="radio"]:checked');
    // var currentParam = radioButtons.length>0? radioButtons[0].value: null;


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

  function setFooterText (code) {
    $(".footer").show();
    let explanation = "";
    switch (code) {
      case "syn":
        explanation = syn;
        break;
      case "ant":
        explanation = ant;
        break;
      case "ml":
        explanation = ml;
        break;
      case "trg":
        explanation = trg;
        break;
      case "spc":
        explanation = spc;
        break;
      case "gen":
        explanation = gen;
        break;
      case "com":
        explanation = com;
        break;
      case "par":
        explanation = par;
        break;
      case "cns":
        explanation = cns;
        break;
      case "rhy":
        explanation = rhy;
        break;
      case "nry":
        explanation = nry;
        break;
      case "sl":
        explanation = sl;
        break;
      case "bga":
        explanation = bga;
        break;
      case "bgb":
        explanation = bgb;
        break;
      case "jja":
        explanation = jja;
        break;
      case "jjb":
        explanation = jjb;
        break;
      default: 
    }
    $(".footer").html(explanation);
  }
