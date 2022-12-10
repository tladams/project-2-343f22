// JS FOR PROJECT 2

// global values to help with html
const searchBoxElem = document.getElementById("query");
const defContainer = document.querySelector(".define");
const posContainer = document.querySelector(".part-of-speech");
const trContainer = document.querySelector(".translate");

// global variables for functionality
let traResultsJson = 0;
let defResultsJson = 0;

// when someone presses enter in the search box,
searchBoxElem.addEventListener("keydown", whenSomeKeyPressed);
async function whenSomeKeyPressed(event) {
  
    if (event.key === "Enter") {
      event.preventDefault();
      const defs = await searchForDef(searchBoxElem.value);
      console.log("defs");
      console.log(defs);
      //console.log("def defs");
      //defs.forEach((def) => {
        //console.log(def);
      //});
      const defPageElem = createDefPageElements(searchBoxElem.value, defs);
      console.log("defPageElements");
      console.log(defPageElem);
      const posPageElem = createPartOfSpeech();
      console.log("posPageElem");
      console.log(posPageElem);
      const translations = await searchForTran(searchBoxElem.value);
      //console.log("translations");
      //console.log(translations);
      const trPageElem = createTrPageElements(translations);
      //console.log("translation");
      //console.log(trPageElem);
      clearPageElem();
      populatePage(defPageElem, posPageElem, trPageElem);
      searchBoxElem.value = '';
    }
}

// searching for query definition using merriam-webster dictionary api
async function searchForDef(query) {
    const defResults = await fetch(
        `https://www.dictionaryapi.com/api/v3/references/collegiate/json/${query}?key=50aeff54-31b4-4797-853d-4ac80489bcdc`
    );
    defResultsJson = await defResults.json();
    console.log("defResultsJson");
    console.log(defResultsJson);
    const defResultsArray = new Array();
    console.log("define results array");
    console.log(defResultsArray);
    if (defResultsJson.length > 1) {
        console.log("defResultsJson.length");
        console.log(defResultsJson.length);
        for(let i = 0; i < 2; i++) {
            console.log("def_res");
            console.log(defResultsJson[i].shortdef);
            defResultsArray.push(defResultsJson[i].shortdef);
        }
    } else {
        defResultsArray = defResultsJson[0].shortdef[0];
    }
    //console.log("defsArray");
    //console.log(defsArray);
    //console.log("defsArray.shortdef");
    //console.log(defsArray.shortdef);
    //defsArray.shortdef.forEach((def) =>{
        //console.log("definitions:");
        //console.log(def);
    //});
    return defResultsArray;
}

// creating definition elements
function createDefPageElements(query, defResults) {
    let dElem = document.createElement("div");
    dElem.classList.add("define");
    let queryP = document.createElement("p");
    queryP.classList.add("query-text");
    let bold = document.createElement("strong");
    bold.append(query);
    queryP.append(bold);
    let defP = document.createElement("p");
    defP.classList.add("define-text");
    let em = document.createElement("em");
    em.append("definition(s):");
    defP.append(em);
    dElem.append(queryP);
    dElem.append(defP);
    let ulElem = document.createElement("ul");
    ulElem.classList.add("define-text");
    defResults.forEach((def) => {
        console.log("def");
        console.log(def);
        if (def[0] != undefined && def[0].length > 0) {
            let liElem = document.createElement("li");
            liElem.append(def);
            ulElem.append(liElem);
        }
    })    
    dElem.append(ulElem);
    //console.log("dElem");
    //console.log(dElem);
    dElem = styledPageElem(dElem);
    return dElem;
}

// creating element for part of speech
function createPartOfSpeech() {
    let posElem = document.createElement("div");
    posElem.classList.add("part-of-speech");
    let posP = document.createElement("p");
    let em = document.createElement("em");
    em.append("part(s) of speech:");
    posP.append(em);
    posP.classList.add("part-of-speech-text");
    posElem.append(posP);
    let ul = document.createElement("ul");
    ul.classList.add("part-of-speech-text")
    let bool = ('False');
    if (defResultsJson.length > 1 && defResultsJson[1].shortdef.length > 0 && (!bool)) {
        defResultsJson.forEach((def_res) => {
            bool = ('True');
            console.log("def result");
            console.log(def_res);
            let li = document.createElement("li");
            li .append(def_res.fl);
            ul.append(li);
        })
    } else {
        let li = document.createElement("li");
        li .append(defResultsJson[0].fl);
        ul.append(li);
    }
    posElem.append(ul);
    posElem = styledPageElem(posElem);
    return posElem;
}

// searching for query translation using merriam-webater spanish-english dict
async function searchForTran(query) {
    const traResults = await fetch(
        `https://www.dictionaryapi.com/api/v3/references/spanish/json/${query}?key=18fe92a4-dafe-4053-94d0-e885ae6b2dfc`
    );
    traResultsJson = await traResults.json();
    
    console.log("traResultsJson");
    console.log(traResultsJson);
    let t_shortdef = 0;
    let bool = false;
    t_shortdef = traResultsJson[0].shortdef;
    if (traResultsJson.length > 1) {
        //console.log(traResultsJson.length);
        traResultsJson.forEach((tJson) => {
            //console.log(tJson);
            if(!bool)
            {
                if(defResultsJson[0].fl == tJson.fl)
                {
                    bool = ("True")
                    //console.log("TRUE");
                    //console.log(tJson.shortdef);
                    t_shortdef = tJson.shortdef;
                }
            }
        });
    }
    return t_shortdef;
}

// creating translation elements
function createTrPageElements(tResults) {
    console.log("tResults");
    console.log(tResults);
    let tElem = document.createElement("div");
    tElem.classList.add("translate");
    let traP = document.createElement("p");
    traP.classList.add("translate-text");
    let em = document.createElement("em");
    em.append("spanish translation(s):");
    traP.append(em);
    tElem.append(traP);
    let ulElem = document.createElement("ul");
    ulElem.classList.add("translate-text");
    traResultsJson.forEach((tjson) => {
        console.log("tjson");
        console.log(tjson);
        if (tjson.shortdef.length > 1) {
            for (let i = 0; i < 2; i++) {
                let liElem = document.createElement("li");
                if(tjson.shortdef[i].includes(':')) {
                    console.log(tjson.shortdef[i]);
                    console.log("includes :");
                    let c_i = tjson.shortdef[i].indexOf(':');
                    let e_w = tjson.shortdef[i].substring(0, c_i - 1);
                    let s_tr = tjson.shortdef[i].substring(c_i + 1, tjson.shortdef[i].length);
                    console.log(c_i);
                    console.log(e_w);
                    console.log(s_tr);
                    liElem.append(s_tr);
                    liElem.append(" (");
                    liElem.append(e_w);
                    liElem.append(")");
                    ulElem.append(liElem);
                } else {
                    console.log("no");
                    console.log(tjson.shortdef[i].toLowerCase());
                    liElem.append(tjson.shortdef[i].toLowerCase());
                    ulElem.append(liElem);
                }
            }
        } else {
            console.log("tjson");
            console.log(tjson);
            let li = document.createElement("li");
            li.append(tjson.shortdef);
            ulElem.append(li);
        }
    })
    tElem.append(ulElem);
    tElem = styledPageElem(tElem);
    return tElem;
}

// styling the page elements
function styledPageElem(defElem) {
    const styledResult = defElem;
    const resultScore = parseInt(defElem.dataset.score, 10);
    styledResult.style.fontSize = `${0.5 + (3.5 * resultScore) / 300}rem`;
    return styledResult;
}

// clearing elements for new search
function clearPageElem() {
    Array.from(defContainer.childNodes).forEach((child) => {
      child.remove();
    });
    Array.from(posContainer.childNodes).forEach((child) => {
        child.remove();
    });
    Array.from(trContainer.childNodes).forEach((child) => {
        child.remove();
    });
}

// populating the page w the elements
function populatePage(dElem, posElem, tElem) {
    defContainer.append(dElem);
    posContainer.append(posElem);
    trContainer.append(tElem);
}


filterDivs("all");
function filterDivs(c) {
    var x, i;
    x = document.querySelectorAll(".info");
    if(c == "all") c = "";
    for(i = 0; i < x.length; i++){
        removeClass(x[i], "show");
        if(x[i].className.indexOf(c) > -1) addClass(x[i], "show");
    }
    console.log("button clicked");
    console.log(x);
}

function addClass(element, name) {
    var i, arr1, arr2;
    arr1 = element.className.split(" ");
    arr2 = name.split(" ");
    for (i = 0; i < arr2.length; i++) {
        if (arr1.indexOf(arr2[i]) == -1) {
            element.className += " " + arr2[i];
        }
    }
}

function removeClass(element, name) {
    var i, arr1, arr2;
    arr1 = element.className.split(" ");
    arr2 = name.split(" ");
    for (i = 0; i < arr2.length; i++) {
        while(arr1.indexOf(arr2[i]) > -1) {
            arr1.splice(arr1.indexOf(arr2[i]), 1);
        }
    }
    element.className = arr1.join(" ")
}

// Add active class to the current button (highlight it)
var btnContainer = document.querySelector(".buttons");
var btns = btnContainer.getElementsByClassName("btn");
for (var i = 0; i < btns.length; i++) {
  btns[i].addEventListener("click", function(){
    var current = document.getElementsByClassName("active");
    current[0].className = current[0].className.replace(" active", "");
    this.className += " active";
  });
}