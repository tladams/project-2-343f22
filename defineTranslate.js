// JS FOR PROJECT 2

const searchBoxElem = document.getElementById("query");
const resultsContainerElem = document.getElementById("results");

// when someone presses enter in the search box,
searchBoxElem.addEventListener("keydown", whenSomeKeyPressed);
async function whenSomeKeyPressed(event) {
  
    if (event.key === "Enter") {
      event.preventDefault();
      const defs = await searchForDef(searchBoxElem.value);
      const defElements = await createDefElements(defs);
      console.log(defElements);
      //clearResultsElem();
      //populateResultsElem(defElements);
    }
}

async function searchForDef(query) {
    const defResults = await fetch(
      `https://api.dictionaryapi.dev/api/v2/entries/en/${query}`
    );
    const defResultsJson = await defResults.json();
    const defsArray = new Array();
    defResultsJson.forEach((obj) => {
        //console.log("meanings:");
        //console.log(obj.meanings);
        const allMeanings = obj.meanings;
        allMeanings.forEach((mean) => {
            //console.log("definitions:")
            //console.log(mean.definitions);
            const allDefs = mean.definitions;
            allDefs.forEach((defs) => {
                //console.log("definitions definition:");
                console.log(defs.definition);
                defsArray.push(defs.definition);
            });
        });
    });
    return defsArray;
}

async function createDefElements(defResults) {
    
    defResults.forEach((def) => {
        let defElem = document.createElement("div");
        defElem.classList.add("result");
        defElem.append(def);
        return defElem;
    });
}

function clearResultsElem() {
    Array.from(resultsContainerElem.childNodes).forEach((child) => {
      child.remove();
    });
}

function populateResultsElem(defResultsElems) {
    resultsContainerElem.append(...defResultsElems);
}