// JS FOR PROJECT 2

// global values to help with html
const searchBoxElem = document.getElementById("query");
const defContainer = document.querySelector(".define");
const trContainer = document.querySelector(".translate");

// global variables for functionality
let traResultsJson = 0;
let defsArray = 0;

// when someone presses enter in the search box,
searchBoxElem.addEventListener("keydown", whenSomeKeyPressed);
async function whenSomeKeyPressed(event) {
  
    if (event.key === "Enter") {
      event.preventDefault();
      const defs = await searchForDef(searchBoxElem.value);
      //console.log("defs");
      //console.log(defs);
      //console.log("def defs");
      //defs.forEach((def) => {
        //console.log(def);
      //});
      const defPageElem = createDefPageElements(searchBoxElem.value, defs);
      //console.log("defPageElements");
      //console.log(defPageElem);
      const translations = await searchForTran(searchBoxElem.value);
      //console.log("translations");
      //console.log(translations);
      const trPageElem = createTrPageElements(translations);
      //console.log("translation");
      //console.log(trPageElem);
      clearPageElem();
      populatePage(defPageElem, trPageElem);
      searchBoxElem.value = '';
    }
}

// searching for query definition using merriam-webster dictionary api
async function searchForDef(query) {
    const defResults = await fetch(
        `https://www.dictionaryapi.com/api/v3/references/collegiate/json/${query}?key=50aeff54-31b4-4797-853d-4ac80489bcdc`
    );
    const defResultsJson = await defResults.json();
    defsArray = defResultsJson[0];
    //console.log("defResultsJson");
    //console.log(defResultsJson);
    //console.log("defsArray");
    //console.log(defsArray);
    //console.log("defsArray.shortdef");
    //console.log(defsArray.shortdef);
    //defsArray.shortdef.forEach((def) =>{
        //console.log("definitions:");
        //console.log(def);
    //});
    return defsArray.shortdef;
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
    em.append("definitions:");
    defP.append(em);
    dElem.append(queryP);
    dElem.append(defP);
    let ulElem = document.createElement("ul");
    ulElem.classList.add("define-text");
    let d_len = 0;
    defResults.forEach((def) => {
        //console.log("def");
        //console.log(def);
        d_len = d_len + def.length;
        let liElem = document.createElement("li");
        liElem.append(def);
        ulElem.append(liElem);
    });    
    if (d_len > 200)  {
        console.log(d_len);
        ulElem.classList = 'long-def-text';
    }
    dElem.append(ulElem);
    //console.log("dElem");
    //console.log(dElem);
    dElem = styledPageElem(dElem);
    return dElem;
}

// searching for query translation using merriam-webater spanish-english dict
async function searchForTran(query) {
    const traResults = await fetch(
        `https://www.dictionaryapi.com/api/v3/references/spanish/json/${query}?key=18fe92a4-dafe-4053-94d0-e885ae6b2dfc`
    );
    traResultsJson = await traResults.json();
    
    //console.log("traResultsJson");
    //console.log(traResultsJson);
    let t_shortdef = 0;
    let bool = false;
    t_shortdef = traResultsJson[0].shortdef;
    if (traResultsJson.length > 1) {
        //console.log(traResultsJson.length);
        traResultsJson.forEach((tJson) => {
            //console.log(tJson);
            if(!bool)
            {
                if(defsArray.fl == tJson.fl)
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
    if (tResults.length > 1 && tResults[0] != tResults[1]) {
        let liElem1 = document.createElement("li");
        liElem1.append(tResults[0].toLowerCase());
        ulElem.append(liElem1);
        let liElem2 = document.createElement("li");
        liElem2.append(tResults[1].toLowerCase());
        ulElem.append(liElem2);
        /*for (let i = 0; i < 2; i++) {
            let liElem = document.createElement("li");
            liElem.append(tResults[i].toLowerCase());
            ulElem.append(liElem);
        }*/
    } else {
        let liElem = document.createElement("li");
        liElem.append(tResults[0].toLowerCase());
        ulElem.append(liElem);
    }
    /*tResults.forEach((tra) => {
        let liElem = document.createElement("li");
        liElem.append(tra);
        ulElem.append(liElem);
    });  */  
    tElem.append(ulElem);
    //console.log("tElem");
    //console.log(tElem);
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
    Array.from(trContainer.childNodes).forEach((child) => {
        child.remove();
    });
}

// populating the page w the elements
function populatePage(dElem, tElem) {
    defContainer.append(dElem);
    trContainer.append(tElem);
}